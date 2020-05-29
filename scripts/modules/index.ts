import { ConsentSharedStates } from './consent'
import { DisqusSharedStates } from './disqus'

declare global {
  interface Window {
    __shared_states__: ConsentSharedStates | DisqusSharedStates;
  }
}

export { default as bootstrapClipboardModule } from './clipboard'
export { default as bootstrapConsentModule } from './consent'
export { default as bootstrapDisqusModule } from './disqus'
export { default as bootstrapEmbedModule } from './embed'
export { default as bootstrapFormModule } from './form'
export { default as bootstrapImageModule } from './image'
export { default as bootstrapLinkModule } from './link'
export { default as bootstrapModalModule } from './modal'
export { default as bootstrapSelectionModule } from './selection'
export { default as bootstrapTogglerModule } from './toggler'
