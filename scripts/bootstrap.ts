import {
  bootstrapClipboardModule,
  bootstrapConsentModule,
  bootstrapDisqusModule,
  bootstrapEmbedModule,
  bootstrapFormModule,
  bootstrapImageModule,
  bootstrapLinkModule,
  bootstrapModalModule,
  bootstrapSelectionModule,
  bootstrapTogglerModule,
  bootstrapTopModule
} from './modules'

export function bootstrap(window: Window): void {
  bootstrapClipboardModule(window)
  bootstrapConsentModule(window)
  bootstrapDisqusModule(window)
  bootstrapEmbedModule(window)
  bootstrapFormModule(window)
  bootstrapImageModule(window)
  bootstrapLinkModule(window)
  bootstrapModalModule(window)
  bootstrapSelectionModule(window)
  bootstrapTogglerModule(window)
  bootstrapTopModule(window)
}
