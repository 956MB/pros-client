import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { ILanguageResource, ILanguageResources } from "../imports/interfaces";

async function importLanguages(): Promise<ILanguageResources> {
    const locales = await readDir('locales/', { dir: BaseDirectory.Resource, recursive: true });
    let resources: ILanguageResources = [];

    for (const locale of locales) {
        if (locale.children) {
            const lang = locale.name;
            const translation = locale.children[0].name;
            if (translation && translation === 'translation.json') {
                const contents = await readTextFile(`locales/${lang}/${translation}`, { dir: BaseDirectory.Resource });
                if (contents) {
                    const obj = JSON.parse(contents);
                    const langText = obj["language"]["text"] as string;
                    resources.push({lang: lang, text: langText} as ILanguageResource);
                    console.log(`[load] lang: ${lang} text: ${langText}`);
                }
            }
        }
    }

    return resources;
}

export { importLanguages }
