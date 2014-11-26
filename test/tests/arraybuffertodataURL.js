QUnit.asyncTest("Building the dataURL of an image", function (assert) {
    'use strict';
    expect(1);
    Btclient.util.ajax('GET', '/test/files/glider.jpg', {}, 'arraybuffer', function (err, res) {
        if (err) {
            throw err;
        }
       var glider = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADO0lEQVRo3u2ZTUhVQRTHf15EJCQkHqIQEVoZJWEfi9AwiKiEiMAEoUWFmFRSroqKFi2CSqJduyxqUYF9QdBCM4QWlWER5CIlKlrEI0rs8VKDZwuPILeZuXfGZ07wDtzFnZn/zPzn45z/uRdylrNZWV7o/SkwatlHIZAAvljiSoAxh/GWAOuBjKryvsMirALOOeDagC0OuLtA/vRL/hzu7iagBgiAV0CvbtVmY3NBoBS4A9SFyt8AjcBwNgcLsjz5AuCxYvIA1UA3UOwzgf0yUZ0tBY76TKA+S23mjUBxltrMG4H3Mdp4fYmvxWhz1WcCz4HzhvrrwAOfCQCcBPaFjtNn4BjQ/D8EMoAb8iRkkZJzFe7DBBaItrGxZTJREy6hKCsD0g7jFZkIJIC9lh0mgCoH3AYJbBUOalRrOTU6S1sDtMiipEU7dQKpf32JXawd6AjNaad4r+26ABh4MvltwGXNgpYDD0XpekvgdIx7tstXAgGwMUa7Wp93IHBt4wOBDDAQo12/zzvQEVH/EbjnM4Eu4KKmLgk0SFzwOg6ckMDVKtIkxdSnmEsmMehbJO6Rx1mNlopGsbEyEWa2uM1ApYMaLTcRGAMGLTtMi6q0xVUCnxxwoyYCI3LudBc+o4mSFRpcMMNVqnCDBpzuM+QRGy+0ArgF/AB+A0PAKZ0uCWmbPuAXMA68APbECFRtwDsZ66dooHU22zMzH6iRTiYVTx9Tn9VV+UC7BjMJXNDkA4GMrcKMiypV5gO6HSiUlS/S1NcBZzR63hSUjgNbFeWHgd0aTAFwE1hkE8h2RKVuwEEFviWGa25VlB2KwBQDTTYEqmLmwiWKixllVYo5rIyBW21DIGXhQk3vcfrOOOKMBHpjdPiSv/9vdcfA9TqO98SGwFvgdoQEVmVRncAHAy4p2iZsZ4GJCNI9tmq0WSNh08ABTYcpScAHNZK4XiPMBkRxjmgm36gLbPkR57uBqZ919eIJhmRnvhpww8BayWFrZZH6ZTFMZ/2RRPQmubApOTY9hqgcS40+k8fGJkTjd1nivgNXbADhH92vI86wyhYCix1EWbk4gW+WuGpg+fSu5CnuhC9ZmsmBZMiZJ/YHdG2zxWNHmgsAAAAASUVORK5CYII=';
        Btclient.util.arraybuffertodataURL(res, 'image/jpeg', true, function (err, res) {
            if (err) {
                throw err;
            }
            console.log(glider);
            console.log(res);
            assert.equal(res, glider, "Glider correctly base64'd.");
            QUnit.start();
        });
    });
});
