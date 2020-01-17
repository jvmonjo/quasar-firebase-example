<template>
  <q-page class="flex flex-center">
    <div id="firebaseui-auth-container" class=""></div>
  </q-page>
</template>

<script>
const firebaseui = require('components/firebaseui/esm__en')

import 'components/firebaseui/firebaseui.css'

export default {
  name: 'PageSignIn',
  mounted () {
    this.$q.loading.show()
    return this.initUi()
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    initUi () {
      const vm = this
      // FirebaseUI config.
      const uiConfig = {
        signInSuccessUrl: vm.$route.query.redirect || '/',
        callbacks: {
          uiShown: function () {
            return vm.$q.loading.hide()
          },
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // If a user signed in with email link, ?showPromo=1234 can be obtained from
            // window.location.href.
            // ...
            console.log('sign in success')
            return true
          }
          // signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          //   // var user = authResult.user;
          //   // var credential = authResult.credential;
          //   // var isNewUser = authResult.additionalUserInfo.isNewUser;
          //   // var providerId = authResult.additionalUserInfo.providerId;
          //   // var operationType = authResult.operationType;
          //   // Do something with the returned AuthResult.
          //   // Return type determines whether we continue the redirect automatically
          //   // or whether we leave that to developer to handle.
          //   return false
          // }
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          // vm.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // vm.$firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // vm.$firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // vm.$firebase.auth.GithubAuthProvider.PROVIDER_ID,
          vm.$firebase.auth.EmailAuthProvider.PROVIDER_ID
          // vm.$firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        // signInFlow: 'popup',
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: `https://tsblades.com/en/terms-and-contions/`,
        privacyPolicyUrl: `https://tsblades.com/en/privacy-policy/`
        // Privacy policy url/callback.
        // privacyPolicyUrl: function () {
        //   window.location.assign('<your-privacy-policy-url>');
        // }
      }

      // Initialize the FirebaseUI Widget using vm.$firebase.
      let ui = firebaseui.auth.AuthUI.getInstance()
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(vm.$firebase.auth())
        // The start method will wait until the DOM is loaded.
      }
      const wrapper = document.querySelector('#firebaseui-auth-container')
      if (wrapper) {
        ui.start('#firebaseui-auth-container', uiConfig)
      }
      if (ui.isPendingRedirect()) {
        console.log('pending redirect')
        vm.$q.loading.show()
      }
      vm.$firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('user', user)
          const userObj = {...user}
          vm.$store.commit('auth/SET_USER', userObj)
        }
      })
    },
    signIn () {
      let credentials = {
        email: this.form.email,
        password: this.form.password
      }

      this.$store.dispatch('auth/signIn', credentials)
        .then(user => {
          this.$router.replace({ name: 'dashboard' }).catch(() => {})
        })
        .catch(error => {
          this.$q.notify('Invalid Login!')
          console.error(`Not signed in: ${error.message}`)
        })
    }
  }
}
</script>

<style>
  .firebaseui-container{
    background-color: rgba(255,255,255,0.9);
  }
</style>
