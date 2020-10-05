import { defineComponent, SetupContext } from 'vue-demi';
import { normalizeChildren } from './utils';
import { useSubscription, defaultReducer, Reducer } from './useSubscription';
import { DocumentNode } from 'graphql';

export const Subscription = defineComponent({
  name: 'Subscription',
  props: {
    query: {
      type: [String, Object],
      required: true,
    },
    variables: {
      type: Object,
      default: null,
    },
    pause: {
      type: Boolean,
      default: false,
    },
    reduce: {
      type: Function,
      default: undefined,
    },
  },
  setup(props: SubscriptionProps, ctx: SetupContext) {
    const { data, error, pause, isPaused, resume } = useSubscription(
      {
        ...props,
      },
      props.reduce || defaultReducer
    );

    return () => {
      return normalizeChildren(ctx, {
        data: data.value,
        error: error.value,
        pause,
        isPaused: isPaused.value,
        resume,
      });
    };
  },
});
