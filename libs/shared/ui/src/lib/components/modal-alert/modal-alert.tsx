import * as Dialog from '@radix-ui/react-dialog'
import {useContext} from 'react'
import {ModalContext} from '../modal'
import {Button, ButtonSize, ButtonStyle} from '../buttons/button'

export interface ModalAlertProps {
  isOpen: boolean
}

export default function ModalAlert ({ isOpen }: ModalAlertProps) {
  const { setModalAlertOpen, setAlertModalChoice } = useContext(ModalContext)

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setModalAlertOpen(!isOpen)}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay flex fixed top-0 left-0 bg-neutral-700/40 w-full h-screen z-40" />
        <Dialog.Content
          data-testid="modal-alert"
          style={{ width: '470px', top: '200px'}}
          className="modal__content fixed top-[84px] left-1/2 bg-white rounded-md shadow-[0_0_32px_rgba(0,0,0,0.08)] z-40"
        >
          <div className="max-h-[80vh] overflow-auto p-6">
            <h2 className="h4 text-neutral-400 mb-2">Discard changes ?</h2>
            <p className="mb-6 text-neutral-350 text-sm">Are you sure you want to discard your changes ?</p>

            <div className="flex gap-4 justif-end">
              <Button
                style={ButtonStyle.STROKED}
                size={ButtonSize.XLARGE}
                onClick={() => {
                  setAlertModalChoice(false)
                  setModalAlertOpen(!isOpen)
                }}
              >
                No
              </Button>
              <Button
                size={ButtonSize.XLARGE}
                onClick={() => {
                  setAlertModalChoice(true)
                  setModalAlertOpen(!isOpen)
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}