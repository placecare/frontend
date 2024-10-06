import { Tooltip } from '../tooltip/tooltip'
import { Fragment } from 'react'

export interface TruncateProps {
  truncateLimit: number;
  text: string;
  defaultTooltipLimit?: number;
  delayDuration?: number;
}

export const truncateText = (text: string, truncateLimit: number) =>
  text.slice(0, truncateLimit)

export function Truncate({
  truncateLimit,
  text,
  defaultTooltipLimit = 200,
  delayDuration = 150,
}: TruncateProps) {
  if (text.length >= truncateLimit) {
    return (
      <Tooltip
        delayDuration={delayDuration}
        content={
          text.length >= defaultTooltipLimit
            ? `${truncateText(text, defaultTooltipLimit)}...`
            : text
        }
      >
        <span data-testid="truncate-text">
          {truncateText(text, truncateLimit)}...
        </span>
      </Tooltip>
    )
  } else {
    return <Fragment>{text}</Fragment>
  }
}
