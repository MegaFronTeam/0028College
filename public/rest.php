<?php

require_once (__DIR__.'/bitrix24.php');

// POST processing
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$leadData = $_POST['DATA'];

	// get lead data from the form
	$postData = array(
		'TITLE' => $leadData['TITLE'] .',  Имя:'.  $leadData['NAME'] .', Телефон:'.  $leadData['PHONE_MOBILE'],
		'NAME' => $leadData['NAME'],
		'PHONE_MOBILE' => $leadData['PHONE_MOBILE']
	);

	$arResult = Bitrix24::sendQuery('/crm/configs/import/lead.php',$postData);
	var_dump($arResult);
  if ($arResult['error'] == 201)
  {
    $arMess['success'] = true;
  }
  else
  {
    $arMess['error_message'] = $arResult['error_message'];
  }

}