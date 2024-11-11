<?php

namespace App\Services;

class UploadImageService
{
    public function saveImage(string $file): array
    {
        try {
            $uploadedFile = cloudinary()->upload($file, ['folder' => env('CLOUDINARY_FILE_NAME')]);
            return [
                'image_url' => $uploadedFile->getSecurePath(),
                'public_id' => $uploadedFile->getPublicId(),
            ];
        } catch (\Throwable $th) {
            throw new \BadMethodCallException($th->getMessage());
        }
    }

}
