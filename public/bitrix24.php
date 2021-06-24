<?php


class Bitrix24
{

	const CRM_HOST = 'mic.bitrix24.com';
	const CRM_PORT = 443;

	const CRM_LOGIN = 'sadavan@yandex.ru';
	const CRM_PASSWORD = 'ralmonyoksokkwrp';


	public static function sendQuery($postUrl, $arPost = array())
	{
		$arPost['LOGIN'] = self::CRM_LOGIN;
		$arPost['PASSWORD'] = self::CRM_PASSWORD;



		$strPost = http_build_query($arPost);
		$postUrl = 'https://'.self::CRM_HOST.$postUrl;

		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $postUrl);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $strPost);
		$out = curl_exec($curl);
		curl_close($curl);

		$out = self::prepareJson($out);
		return json_decode($out, true);
	}

	protected static function prepareJson($out)
	{
		$out = str_replace("'", '"', $out);
		return $out;
	}
}