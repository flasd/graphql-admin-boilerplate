import {
  compose, withStateHandlers, withHandlers, branch,
} from 'recompose';

export default function withSearch(payloadName = 'payload') {
  let searchId = 0;
  let lastUpdate = new Date().valueOf();

  return branch(
    (props) => props.handleSearch,
    compose(
      withStateHandlers((props) => ({
        loading: false,
        lastSearch: 0,
        [payloadName]: props[payloadName],
      }),
      {
        onRequestStart: () => () => ({ loading: true }),
        onRequestEnd: () => (payload) => {
          lastUpdate = new Date().valueOf();
          return ({ loading: false, [payloadName]: payload });
        },
      }),

      withHandlers({
        handleSearch: (props) => async (value) => {
          searchId += 1;

          const currentSearch = searchId;
          const {
            onRequestStart,
            onRequestEnd,
            handleSearch,
            updateMaxWait = 280,
            [payloadName]: payload,
          } = props;

          try {
            onRequestStart();

            const newPayload = await handleSearch(value, payload);
            const diff = new Date().valueOf() - lastUpdate;

            if (currentSearch === searchId || diff > updateMaxWait) {
              onRequestEnd(newPayload);
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.error(error);
            }
            onRequestEnd(payload);
          }
        },
      }),
    ),
  );
}
