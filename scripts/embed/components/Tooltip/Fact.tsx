import * as m from 'mithril'

import { cx, makeClassName } from '../../libs'
import { GW2Fact, GW2FactType } from '../../types'

import { Icon } from '../Icon'

import { attributeToName, calculateFactDamage, markup } from './lib'

import * as styles from './styles'

interface FactTooltipAttributes extends m.Attributes {
  data: GW2Fact;
}

class FactContainer implements m.Component<m.Attributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<m.Attributes>) {
    return <div
      className={cx(styles.fact.root, className, makeClassName('tooltip-fact'))}
      {...attrs}
    >{children}</div>
  }
}

class FactIcon implements m.Component<m.Attributes> {
  public view({
    attrs: {
      className,
      src,
      ...attrs
    },
    children
  }: m.Vnode<m.Attributes>) {
    return <Icon
      className={cx(styles.fact.icon, className)}
      classSize={styles.fact.iconSize}
      placeholder={true}
      src={src}
      {...attrs}
    >{children}</Icon>
  }
}

class FactText implements m.Component<m.Attributes> {
  public view({
    attrs: {
      className,
      ...attrs
    },
    children
  }: m.Vnode<m.Attributes>) {
    return <span
      className={cx(styles.fact.text, className)}
      {...attrs}
    >{children}</span>
  }
}

export class TooltipFact implements m.Component<FactTooltipAttributes> {
  public view({
    attrs: {
      data: fact
    }
  }: m.Vnode<FactTooltipAttributes>): m.Children {
    switch (fact.type) {
      case GW2FactType.ATTRIBUTE_ADJUST:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{fact.text || attributeToName(fact.target)}: +{fact.value}</FactText>
        </FactContainer>
      case GW2FactType.BUFF:
        return <FactContainer>
          <FactIcon applyCount={fact.apply_count} src={fact.icon} />
          {
            fact.duration ?
            <FactText>{fact.status}<FactText>({fact.duration}s)</FactText>: {markup(fact.description || '')}</FactText> :
            <FactText>{fact.status}: {markup(fact.description || '')}</FactText>
          }
        </FactContainer>
      case GW2FactType.BUFF_CONVERSION:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>Gain {attributeToName(fact.target)} Based on a Percentage of {attributeToName(fact.source)}: {fact.percent}%</FactText>
        </FactContainer>
      case GW2FactType.COMBO_FIELD:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.field_type}</FactText>
        </FactContainer>
      case GW2FactType.COMBO_FINISHER:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          {
            fact.percent > 0 && fact.percent < 100 ?
            <FactText>{markup(fact.text)}: {fact.finisher_type} ({fact.percent}% Chance)</FactText> :
            <FactText>{markup(fact.text)}: {fact.finisher_type}</FactText>
          }
        </FactContainer>
      case GW2FactType.DAMAGE:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          {
            fact.hit_count > 1 ?
            <FactText>{markup(fact.text)}<FactText>({fact.hit_count}x)</FactText>: {calculateFactDamage(fact.hit_count, fact.dmg_multiplier)}</FactText> :
            <FactText>{markup(fact.text)}: {calculateFactDamage(fact.hit_count)}</FactText>
          }
        </FactContainer>
      case GW2FactType.DISTANCE:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.distance}</FactText>
        </FactContainer>
      case GW2FactType.DURATION:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.duration}s</FactText>
        </FactContainer>
      case GW2FactType.HEAL:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{fact.text}: {fact.hit_count}x</FactText>
        </FactContainer>
      case GW2FactType.HEALING_ADJUST:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{fact.text}: {fact.hit_count}x</FactText>
        </FactContainer>
      case GW2FactType.NO_DATA:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}</FactText>
        </FactContainer>
      case GW2FactType.NUMBER:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.value}</FactText>
        </FactContainer>
      case GW2FactType.PERCENT:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.percent}%</FactText>
        </FactContainer>
      case GW2FactType.PREFIXED_BUFF:
        return <FactContainer>
          <FactIcon src={fact.prefix.icon} />
          <FactIcon applyCount={fact.apply_count} src={fact.icon} />
          {
            fact.duration ?
            <FactText>{fact.status}<FactText>({fact.duration}s)</FactText>: {fact.description}</FactText> :
            <FactText>{fact.text}: {fact.description}</FactText>
          }
        </FactContainer>
      case GW2FactType.RADIUS:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.distance}</FactText>
        </FactContainer>
      case GW2FactType.RANGE:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.value}</FactText>
        </FactContainer>
      case GW2FactType.RECHARGE:
        return <FactContainer className={styles.fact.recharge}>
          <FactText>{fact.value}</FactText>
          <FactIcon className={styles.fact.rechargeIcon} src={fact.icon} />
        </FactContainer>
      case GW2FactType.TIME:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}: {fact.duration} {fact.duration > 1 ? 'seconds' : 'second'}</FactText>
        </FactContainer>
      case GW2FactType.UNBLOCKABLE:
        return <FactContainer>
          <FactIcon src={fact.icon} />
          <FactText>{markup(fact.text)}</FactText>
        </FactContainer>
      default:
        console.warn('Unknown fact type.', fact)
        return null
    }
  }
}
