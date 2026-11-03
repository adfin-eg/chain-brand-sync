import { bootstrapApplication } from '@angular/platform-browser';
import { registerIcons } from '@brandsync/wc/dist/components';
import { defineCustomElements } from '@brandsync/wc/loader';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { PHOSPHOR_ICONS } from './app/icons/phosphor-icons';

defineCustomElements();
registerIcons(PHOSPHOR_ICONS);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
