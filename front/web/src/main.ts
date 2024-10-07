import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { enableProdMode } from "@angular/core";
import { builderDevTools } from "@builder.io/dev-tools/angular";
import { environment } from "../environment/environment";
if (environment.production) {
    enableProdMode();
}
platformBrowserDynamic()
    .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
})
    .catch((err) => console.error(err));

builderDevTools().catch((err: Error) =>
    console.error("Error starting dev tools:", err)
  );