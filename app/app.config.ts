export default defineAppConfig({
  ui: {
    colors: {
      primary: 'pink',
      neutral: 'slate'
    },
    drawer: {
      slots: {
        handle: '!rounded-2xl',
        container: 'pb-4 px-2 sm:px-4 lg:px-2',
        overlay: 'backdrop-filter backdrop-blur-sm'
      }
    },
    select: {
      slots: {
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-300',
        content: 'min-w-fit'
      }
    }
  }
})
