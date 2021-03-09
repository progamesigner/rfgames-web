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
  bootstrapTabModule,
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
  bootstrapTabModule(window)
  bootstrapTogglerModule(window)
  bootstrapTopModule(window)
}
