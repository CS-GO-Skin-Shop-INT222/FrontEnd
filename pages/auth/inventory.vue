
<template>
  <div class="text-center">
      <h1 class="text-center ma-6">Inventory</h1>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    data: () => ({
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
  }
</script>