
import { I18n } from "i18n-js";
import en from './en';
import ru from './ru';

const i18n = new I18n({
    en, ru
})


i18n.fallbacks = true;
i18n.translations = { en, ru };

console.log(i18n)
export default i18n;
