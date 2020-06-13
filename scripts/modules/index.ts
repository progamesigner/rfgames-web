import { ConsentSharedStates } from './consent'
import { DisqusSharedStates } from './disqus'

declare global {
  interface Window {
    __shared_states__: ConsentSharedStates & DisqusSharedStates;
  }
}

export { bootstrap as bootstrapClipboardModule } from './clipboard'
export { bootstrap as bootstrapConsentModule } from './consent'
export { bootstrap as bootstrapDisqusModule } from './disqus'
export { bootstrap as bootstrapEmbedModule } from './embed'
export { bootstrap as bootstrapFormModule } from './form'
export { bootstrap as bootstrapImageModule } from './image'
export { bootstrap as bootstrapLinkModule } from './link'
export { bootstrap as bootstrapModalModule } from './modal'
export { bootstrap as bootstrapSelectionModule } from './selection'
export { bootstrap as bootstrapTogglerModule } from './toggler'
