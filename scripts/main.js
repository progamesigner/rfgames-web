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
  bootstrapTogglerModule
} from './modules'

const bootstrap = () => {
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  setTimeout(bootstrap, 1)
}
