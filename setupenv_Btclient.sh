#!/bin/bash

setupenv_Btclient() {
    which npm || (echo '
        [!] You need npm to continue.
        Check your distribution documentation.'; return);
    which bower || (echo '
        [!] You need bower to continue.
        Check your distribution documentation.'; return);
    git clone https://github.com/NAGTeam/btclient.git || return;
    cd btclient;
    npm install || (echo '
        [!] npm failed to install dependencies.'; return);
    bower install || (echo '
        [!] bower failed to install dependencies.'; return);
    make build  || (echo '
        [!] Make failed the building process'; return);
    echo; echo '[+] You are now ready to contribute!';
}

setupenv_Btclient;
