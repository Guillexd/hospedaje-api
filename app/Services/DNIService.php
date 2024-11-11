<?php

namespace App\Services;

use GuzzleHttp\Client;

class DNIService
{
    public function __construct(protected Client $client) {}

    public function getInformation($dni)
    {
        $res = $this->client->request('GET', '/v2/reniec/dni', [
            'query' => ['numero' => $dni],
            'headers' => [
                'Referer' => 'https://apis.net.pe/api-consulta-dni',
            ],
        ]);

        $response = json_decode($res->getBody()->getContents(), true);
        return response()->json($response);
    }
}
