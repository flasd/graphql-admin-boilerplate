import { compose, withStateHandlers, mapProps } from 'recompose';

export function privateHandleOpen() {
  return (modalData) => ({
    modalVisible: true,
    modalData,
  });
}

export function privateHandleClose() {
  return () => ({
    modalVisible: false,
  });
}

export function privateHandleClear() {
  return () => ({
    modalData: null,
  });
}

export const privateInitialState = {
  modalVisible: false,
  modalData: null,
};

export const privateStateHandlers = {
  openModal: privateHandleOpen,
  privateCloseModal: privateHandleClose,
  privateClear: privateHandleClear,
};

export function privateFactory($handleClose, $handleClear) {
  return () => {
    $handleClose();

    setTimeout(() => {
      $handleClear();
    }, 225);
  };
}

export function privateMapProps($factory) {
  return (props) => {
    const fn = $factory(props.privateCloseModal, props.privateClear);

    return {
      ...props,
      closeModal: fn,
    };
  };
}

export default compose(
  withStateHandlers(privateInitialState, privateStateHandlers),
  mapProps(privateMapProps(privateFactory)),
);
