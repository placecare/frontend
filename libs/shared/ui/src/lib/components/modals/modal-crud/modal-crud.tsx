import { ReactNode, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonSize, ButtonStyle } from '../../buttons/button'
import { Truncate } from '../../truncate/truncate'
import { Popover } from '../../popover/popover'
import { Icon } from '../../icons/icon'

export interface ModalCrudProps {
  children: ReactNode
  title: string
  onClose: () => void
  onSubmit: () => void
  isEdit?: boolean
  loading?: boolean
  description?: string
  submitLabel?: string
  forServiceName?: string
  onDelete?: () => void
  deleteButtonLabel?: string
  howItWorks?: ReactNode
}

export function ModalCrud(props: ModalCrudProps) {
  const {
    onSubmit,
    onClose,
    loading,
    children,
    title,
    isEdit,
    description,
    forServiceName,
    onDelete,
    submitLabel,
    deleteButtonLabel,
    howItWorks = null,
  } = props

  const { formState, trigger } = useFormContext()

  useEffect(() => {
    if (isEdit) trigger().then()
  }, [trigger, isEdit])

  return (
    <div className="p-6">
      <h2 className="font-title text-neutral-400 max-w-sm truncate">{title}</h2>
      {description && <p className="mt-2 text-neutral-350 text-sm">{description}</p>}
      {forServiceName && (
        <div className="text-neutral-400 text-sm flex justify-between items-center mt-4">
          <p>
            For{' '}
            <strong className="text-neutral-400 font-medium">
              <Truncate truncateLimit={60} text={forServiceName} />
            </strong>
          </p>
        </div>
      )}
      {howItWorks && (
        <Popover.Root>
          <Popover.Trigger>
            <span className="text-sm cursor-pointer text-brand-500 hover:text-brand-600 transition font-medium mt-2">
              Show how it works <Icon className="text-xs" name={'mdi:information-slab-circle'} />
            </span>
          </Popover.Trigger>
          <Popover.Content side="left" className="text-neutral-350 text-sm relative" style={{ width: 200 }}>
            <h6 className="text-neutral-400 font-medium mb-2">How it works</h6>
            {howItWorks}
            <Popover.Close className="absolute top-4 right-4">
              <button type="button">
                <Icon name="ep:close" className="text-lg leading-4 font-thin text-neutral-400" />
              </button>
            </Popover.Close>
          </Popover.Content>
        </Popover.Root>
      )}
      <div className="mt-6">
        {children}
        <div className="flex gap-3 justify-end mt-6">
          {isEdit && onDelete ? (
            <Button
              dataTestId="delete-button"
              className="btn--no-min-w"
              style={ButtonStyle.ERROR}
              size={ButtonSize.XLARGE}
              onClick={() => onDelete()}
            >
              {deleteButtonLabel || 'Supprimer'}
            </Button>
          ) : (
            <Button
              dataTestId="cancel-button"
              className="btn--no-min-w"
              style={ButtonStyle.STROKED}
              size={ButtonSize.XLARGE}
              onClick={onClose}
            >
              Annuler
            </Button>
          )}
          <Button
            dataTestId="submit-button"
            className="btn--no-min-w"
            type="submit"
            size={ButtonSize.XLARGE}
            onClick={() => {
              onSubmit()
            }}
            disabled={!formState.isValid}
            loading={loading}
          >
            {submitLabel || (isEdit ? 'Confirmer' : 'Créer')}
          </Button>
        </div>
      </div>
    </div>
  )
}

