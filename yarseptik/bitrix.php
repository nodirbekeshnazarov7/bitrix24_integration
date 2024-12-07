<?php
// PHP error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include Bitrix API file
include_once('./crest.php');

// Get data from POST
$data = $_POST;  // Data from the AJAX request

// Extract the necessary fields
$title = isset($data['TITLE']) ? $data['TITLE'] : 'No Title';
$name = isset($data['NAME']) ? $data['NAME'] : 'No Name';
$phone = isset($data['PHONE']) ? $data['PHONE'] : '';
$send_where = isset($data['SEND_WHERE']) ? $data['SEND_WHERE'] : '';
$message = isset($data['MESSAGE']) ? $data['MESSAGE'] : '';

// API call to add a new lead
$result = CRest::call(
    'crm.lead.add',
    [
        'fields' => [
            'TITLE' => $title,  // Use dynamic title
            'NAME' => $name,    // Use dynamic name
            'PHONE' => [
                [
                    $data['PHONE'],
                ]
            ],
            'COMMENTS' => $message,  // Use dynamic message for comments
            'SOURCE_DESCRIPTION' => $message,  // Use dynamic message for comments
            'ADDRESS' => $send_where,  // You can add custom fields like send_where here
            'ADDRESS_2' => $send_where,  // You can add custom fields like send_where here
        ]
    ]
);

// Return the result as JSON
echo json_encode($result);
?>
