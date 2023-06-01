import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'

import './index.css'
import PlayerProvider from "./context/PlayerContext";
import SettingsProvider from "./context/SettingsContext";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import backend from "i18next-http-backend";
import * as locales from './locales/locales'

const langs = await locales.importLanguages();

i18next
    .use(backend)
    .init({
        lng: 'en_US',
        fallbackLng: 'en_US',
        ns: 'translation',
        fallbackNS: 'translation',
        interpolation: { escapeValue: false },
        load: 'currentOnly',
        supportedLngs: langs.map((lang) => lang.lang),
        backend: {
            allowMultiLoading: false,
            loadPath: 'src/locales/{{lng}}/translation.json'
        }
    });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18next}> <SettingsProvider langs={langs}> <PlayerProvider initPlayers={true}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PlayerProvider> </SettingsProvider> </I18nextProvider>
)