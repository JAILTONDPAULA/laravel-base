<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class FileVersionService
{
    /**
     * Get the file with the highest timestamp in the given directory.
     *
     * @param string $path Relative path to the directory (e.g., '/css/app' or '/js/app').
     * @return string|null Full path to the file with the highest timestamp or null if no files found.
     */
    public static function get(string $path): ?string
    {
        $extension = str_contains($path, '/css') ? 'css' : (str_contains($path, '/js') ? 'js' : null);

        if (!$extension) {
            return null; // Return null if the path does not indicate 'css' or 'js'.
        }

        $fullPath = public_path($path);

        if (!File::exists($fullPath) || !File::isDirectory($fullPath)) {
            return null;
        }

        $files = collect(File::files($fullPath))
            ->filter(fn($file) => $file->getExtension() === $extension)
            ->sortByDesc(fn($file) => $file->getMTime());

        $latestFile = $files->first();

        return $latestFile ? asset($path . '/' . $latestFile->getFilename()) : null;
    }
}
