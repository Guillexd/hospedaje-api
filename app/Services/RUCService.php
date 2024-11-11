<?php

namespace App\Services;

use GuzzleHttp\Client;

class RUCService
{
    public function __construct(protected Client $client) {}

    public function getInformation($ruc)
    {
        $res = $this->client->request('GET', '/v2/sunat/ruc', [
            'query' => ['numero' => $ruc],
            'headers' => [
                'Referer' => 'https://apis.net.pe/api-consulta-ruc',
            ],
        ]);

        $response = json_decode($res->getBody()->getContents(), true);
        return response()->json($response);
    }
}
