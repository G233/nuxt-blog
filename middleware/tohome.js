export default function({ store, redirect }) {
  if (store.state.isfirst) {
    store.commit("tohome");
    return redirect("/home");
  }
}
