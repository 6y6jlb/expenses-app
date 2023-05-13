import { I18n } from "i18n-js"
import en from "./en"
import ru from "./ru"
import es from "./es"

const i18n = new I18n({
	["en"]: en,
	["en-US"]: en,
	["ru"]: ru,
	["ru-RU"]: ru,
	["es"]: es,
})

i18n.fallbacks = true
i18n.defaultLocale = "en";

export default i18n
