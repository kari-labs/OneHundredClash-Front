
<script>
export default {
  beforeMount() {
    localStorage.clear();
    this.$router.push("/");
  }
};
</script>
