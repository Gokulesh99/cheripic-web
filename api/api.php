<?php
/**
 * CheriPic Partner — API
 * --------------------------------------------------------------------------
 * Action-routed single-file API. Call any endpoint with ?action=NAME :
 *
 *   POST …/api.php?action=insertPartnerData      (JSON body — the apply form)
 *   GET  …/api.php?action=getPartnerList&key=KEY (all records)
 *   GET  …/api.php?action=displayOnePartnerInfo&id=5&key=KEY  (one record)
 *
 * To add a new endpoint:
 *   1. write a function at the bottom
 *   2. add one line to the $routes map
 * All DB work goes through the single db() helper.
 */

// ===========================================================================
// 1. CONFIG — edit these to match your hosting
// ===========================================================================
$DB_HOST = 'localhost';
$DB_USER = 'cheripic_partner';
$DB_PASS = 'Cheripic@2026';
$DB_NAME = 'cheripic_partner';

// Which websites are allowed to call this API (CORS). Add your live domain(s)
// and any local dev URLs here. Use ['*'] to allow any origin.
$ALLOWED_ORIGINS = [
    'https://cheripic.com',
    'https://www.cheripic.com',
    'http://localhost:5500',
    'http://localhost:5173',
    'http://localhost:3000',
];

// Secret key required for the admin endpoints (list / single). Change it.
$ADMIN_KEY = 'cheripic-admin-2026';

// ===========================================================================
// 2. CORS + headers
// ===========================================================================
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array('*', $ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: *');
} elseif (in_array($origin, $ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Browsers send a preflight OPTIONS request before the JSON POST.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ===========================================================================
// 3. ROUTER — map ?action=NAME to a function
// ===========================================================================
$routes = [
    'insertPartnerData'     => 'insertPartnerData',
    'getPartnerList'        => 'getPartnerList',
    'displayOnePartnerInfo' => 'displayOnePartnerInfo',
];

$action = $_GET['action'] ?? '';

if (!isset($routes[$action])) {
    respond(404, ['success' => false, 'message' => 'Unknown action']);
}

$routes[$action](); // call the endpoint


// ===========================================================================
// 4. SHARED HELPERS — reuse these for every endpoint
// ===========================================================================

/**
 * Run any prepared query. Handles connect (once), prepare, bind and execute.
 *
 *   $r = db('INSERT INTO t (a,b) VALUES (?,?)', 'si', [$a, $b]);  $r['insert_id'];
 *   $r = db('SELECT * FROM t WHERE a = ?', 's', [$a]);            $r['rows'];
 *   $r = db('DELETE FROM t WHERE id = ?', 'i', [$id]);           $r['affected'];
 *
 * @return array{insert_id:int, affected:int, rows:array}
 */
function db($sql, $types = '', $params = [])
{
    static $conn = null;

    if ($conn === null) {
        global $DB_HOST, $DB_USER, $DB_PASS, $DB_NAME;
        mysqli_report(MYSQLI_REPORT_OFF); // we handle errors manually
        $conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
        if ($conn->connect_errno) {
            respond(500, ['success' => false, 'message' => 'Database connection failed']);
        }
        $conn->set_charset('utf8mb4');
    }

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        respond(500, ['success' => false, 'message' => 'Failed to prepare statement']);
    }

    if ($types !== '') {
        $stmt->bind_param($types, ...$params);
    }

    if (!$stmt->execute()) {
        respond(500, ['success' => false, 'message' => 'Failed to execute statement']);
    }

    $res  = $stmt->get_result();
    $rows = $res ? $res->fetch_all(MYSQLI_ASSOC) : [];

    $out = [
        'insert_id' => $stmt->insert_id,
        'affected'  => $stmt->affected_rows,
        'rows'      => $rows,
    ];

    $stmt->close();
    return $out;
}

/** Decode the JSON request body into an array (or fail with 400). */
function input()
{
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        respond(400, ['success' => false, 'message' => 'Invalid JSON payload']);
    }
    return $data;
}

/** Require the ?key= admin key for protected endpoints. */
function requireAdmin()
{
    global $ADMIN_KEY;
    if (($_GET['key'] ?? '') !== $ADMIN_KEY) {
        respond(401, ['success' => false, 'message' => 'Unauthorized']);
    }
}

/** Only allow a specific HTTP method for an endpoint. */
function requireMethod($method)
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        respond(405, ['success' => false, 'message' => 'Method not allowed']);
    }
}

/** Send a JSON response and stop. */
function respond($status, $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}


// ===========================================================================
// 5. ENDPOINTS — one function per action
// ===========================================================================

/** POST ?action=insertPartnerData — store a new application from the form. */
function insertPartnerData()
{
    requireMethod('POST');
    $data = input();

    $businessName = trim($data['businessName'] ?? '');
    $contactName  = trim($data['contactName']  ?? '');
    $email        = trim($data['email']        ?? '');
    $website      = trim($data['website']       ?? '');
    $category     = trim($data['category']      ?? '');
    $city         = trim($data['city']          ?? '');
    $about        = trim($data['about']         ?? '');

    // Validate (mirrors the frontend rules)
    $errors = [];
    if ($businessName === '') $errors['businessName'] = 'Business Name is required';
    if ($contactName  === '') $errors['contactName']  = 'Contact Name is required';

    if ($email === '') {
        $errors['email'] = 'Email Address is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address';
    }

    if ($website !== '' && !preg_match('#^https?://.+#i', $website)) {
        $errors['website'] = 'Website must start with http:// or https://';
    }

    if ($category === '') $errors['category'] = 'Please select a category';
    if ($city     === '') $errors['city']     = 'City is required';
    if ($about    === '') $errors['about']    = 'Tell us about your experience';

    if (!empty($errors)) {
        respond(422, ['success' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    }

    $ip     = $_SERVER['REMOTE_ADDR'] ?? null;
    $result = db(
        'INSERT INTO partner_applications
            (business_name, contact_name, email, website, category, city, about, ip_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        'ssssssss',
        [$businessName, $contactName, $email, $website, $category, $city, $about, $ip]
    );

    respond(201, [
        'success' => true,
        'message' => 'Application received',
        'id'      => $result['insert_id'],
    ]);
}

/** GET ?action=getPartnerList&key=KEY — list all applications, newest first. */
function getPartnerList()
{
    requireMethod('GET');
    requireAdmin();

    $result = db('SELECT * FROM partner_applications ORDER BY created_at DESC');

    respond(200, [
        'success' => true,
        'count'   => count($result['rows']),
        'data'    => $result['rows'],
    ]);
}

/** GET ?action=displayOnePartnerInfo&id=5&key=KEY — fetch one application. */
function displayOnePartnerInfo()
{
    requireMethod('GET');
    requireAdmin();

    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        respond(400, ['success' => false, 'message' => 'Valid id is required']);
    }

    $result = db('SELECT * FROM partner_applications WHERE id = ?', 'i', [$id]);

    if (empty($result['rows'])) {
        respond(404, ['success' => false, 'message' => 'Record not found']);
    }

    respond(200, [
        'success' => true,
        'data'    => $result['rows'][0],
    ]);
}
