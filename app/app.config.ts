export default defineAppConfig({
  ui: {
    colors: {
      primary: 'pink',
      error: 'rose',
      neutral: 'slate'
    },
    drawer: {
      slots: {
        container: 'pb-4 px-2 sm:px-4 lg:px-2',
        overlay: 'backdrop-filter backdrop-blur-sm'
      }
    },
    select: {
      slots: {
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-300',
        content: 'min-w-fit'
      }
    },
    button: {
      slots: {
        base: ['rounded-xl border-2 border-b-6 transform focus:!mt-[4px] focus:translate-y-[4px] focus:border-b-2']
      },
      variants: {
        color: {
          primary: '!text-neutral-100 border-primary-600 hover:border-primary-600/75 focus:border-primary-600/75',
          error: '!text-neutral-100 border-error-600 hover:border-error-600/75 focus:border-error-600/75',
          neutral: '!text-neutral-800 !bg-neutral-200 border-neutral-400 focus:border-neutral-400/75 focus:border-neutral-400/75 dark:!text-neutral-100 dark:!bg-neutral-700 dark:border-neutral-800 dark:focus:border-neutral-800/75 dark:focus:border-neutral-800/75'
        }
      }
    },
    textarea: {
      slots: {
        base: ['rounded-2xl']
      }
    }
  }
})
