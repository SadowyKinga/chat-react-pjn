const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] to adres lokalnego hosta IPv6.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 st uważany za host lokalny dla IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Konstruktor URL jest dostępny we wszystkich przeglądarkach obsługujących SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // To działa na lokalnym hoście. Sprawdźmy, czy pracownik serwisu nadal istnieje, czy nie.
        checkValidServiceWorker(swUrl, config);

        // Dodaj dodatkowe logowanie do localhost
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Nie jest hostem lokalnym. Wystarczy zarejestrować pracownika serwisu
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // W tym momencie zaktualizowana zawartość z pamięci podręcznej została pobrana,
              // ale poprzedni serwisant nadal będzie służył starszemu
              // zawartość do momentu zamknięcia wszystkich kart klienta.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Wykonaj callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // W tym momencie wszystko zostało zapisane w pamięci podręcznej.
              // "Treść jest buforowana do użytku w trybie offline." wiadomość.
              console.log('Content is cached for offline use.');

              // Wykonaj callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
// Sprawdź, czy można znaleźć pracownika serwisu. Jeśli nie może przeładować strony.
  fetch(swUrl)
    .then(response => {
      // Upewnij się, że Service Worker istnieje i że naprawdę otrzymujemy plik JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nie znaleziono pracownika serwisu. Prawdopodobnie inna aplikacja. Odśwież stronę.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Znaleziono pracownika serwisu. Postępuj jak zwykle.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
