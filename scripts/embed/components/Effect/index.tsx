import * as m from 'mithril'

import { cx } from '../../libs'
import { HasTextAttributes, HasIconAttributes } from '../../types'

import { Container } from '../Container'
import { Icon } from '../Icon'
import { Text } from '../Text'

import {
  Auras,
  Boons,
  Conditions,
  ControlEffects,
  Miscellaneous
} from './effects'

import * as images from '../../images'

import * as styles from './styles'

interface EffectAttributes extends
  m.Attributes,
  HasTextAttributes,
  HasIconAttributes
{
  id: Effects;
}

type Effects = Auras | Boons | Conditions | ControlEffects | Miscellaneous

function getEffectIcon(id: Effects): string {
  switch (id) {
    case Auras.CHAOS_AURA:
      return images.chaosAura
    case Auras.DARK_AURA:
      return images.darkAura
    case Auras.FIRE_AURA:
      return images.fireAura
    case Auras.FROST_AURA:
      return images.frostAura
    case Auras.LIGHT_AURA:
      return images.lightAura
    case Auras.MAGNETIC_AURA:
      return images.magneticAura
    case Auras.SHOCKING_AURA:
      return images.shockingAura
    case Boons.AEGIS:
      return images.aegis
    case Boons.ALACRITY:
      return images.alacrity
    case Boons.FURY:
      return images.fury
    case Boons.MIGHT:
      return images.might
    case Boons.PROTECTION:
      return images.protection
    case Boons.QUICKNESS:
      return images.quickness
    case Boons.REGENERATION:
      return images.regeneration
    case Boons.RESISTANCE:
      return images.resistance
    case Boons.RETALIATION:
      return images.retaliation
    case Boons.STABILITY:
      return images.stability
    case Boons.SWIFTNESS:
      return images.swiftness
    case Boons.VIGOR:
      return images.vigor
    case Conditions.BLEEDING:
      return images.bleeding
    case Conditions.BLINDED:
      return images.blinded
    case Conditions.BURNING:
      return images.burning
    case Conditions.CHILLED:
      return images.chilled
    case Conditions.CONFUSION:
      return images.confusion
    case Conditions.CRIPPLED:
      return images.crippled
    case Conditions.FEAR:
      return images.fear
    case Conditions.IMMOBILE:
      return images.immobile
    case Conditions.POISONED:
      return images.poisoned
    case Conditions.SLOW:
      return images.slow
    case Conditions.TAUNT:
      return images.taunt
    case Conditions.TORMENT:
      return images.torment
    case Conditions.VULNERABILITY:
      return images.vulnerability
    case Conditions.WEAKNESS:
      return images.weakness
    case ControlEffects.DAZE:
      return images.daze
    case ControlEffects.FLOAT:
      return images.float
    case ControlEffects.KNOCKBACK:
      return images.knockback
    case ControlEffects.KNOCKDOWN:
      return images.knockdown
    case ControlEffects.LAUNCH:
      return images.launch
    case ControlEffects.PULL:
      return images.pull
    case ControlEffects.SINK:
      return images.sink
    case ControlEffects.STUN:
      return images.stun
    case Miscellaneous.AGONY:
      return images.agony
    case Miscellaneous.BARRIER:
      return images.barrier
    case Miscellaneous.INVULNERABILITY:
      return images.invulnerability
    case Miscellaneous.REVEALED:
      return images.revealed
    case Miscellaneous.STEALTH:
      return images.stealth
    case Miscellaneous.STUNBREAK:
      return images.stunbreak
    case Miscellaneous.SUPERSPEED:
      return images.superspeed
    default:
      return ''
  }
}

export class Effect implements m.Component<EffectAttributes> {
  public view({
    attrs: {
      classIcon,
      className,
      classSize,
      classText,
      disableIcon,
      disableText,
      id,
      overrideText
    }
  }: m.Vnode<EffectAttributes>): m.Children {
    const icon = getEffectIcon(id)

    return <Container className={cx(className)} type="effect">
      {
        !disableIcon ?
        <Icon
          className={cx(styles.icon.root, classIcon)}
          classSize={cx(styles.icon.size, classSize)}
          disablePlaceholder={true}
          src={icon}
        /> :
        null
      }
      {
        !disableText ?
        <Text
          className={cx(styles.name, classText)}
        >{overrideText || id}</Text> :
        null
      }
    </Container>
  }
}
