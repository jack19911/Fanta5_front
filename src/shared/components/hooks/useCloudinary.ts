/* eslint-disable @typescript-eslint/no-explicit-any */

export function useCloudinary() {

    function openWidget(): Promise<{ img: string, tmb: string }> {
        return new Promise((resolve, reject) => {
            const uploadWidget = window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dd2shhonr',
                    uploadPreset: 'ml_default',
                    sources: ['local', 'camera', 'url']
                },
                function (error: any, result: any) {
                    if (!error && result.event === 'success') {
                        const img = result.info.url;
                        const tmb = result.info.thumbnail_url;
                        resolve({ img, tmb })
                    } else if (error) {
                        reject("Image didn't load!")
                    }
                }
            )

            uploadWidget.open();
        })

    }

    return {
        openWidget
    }
}