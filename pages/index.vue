<template>
  <div class="container-fluid">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else>
      <div class="title">
        <h4> {{ $t('subject.AllSubjects') }} </h4>
      </div>

      <div class="row">

        <div class="col-md-6" v-for="subject in subjects" :key="subject.id">
          <div class="subject-card d-flex flex-wrap">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="40" height="40" x="0" y="0" viewBox="0 0 58 56" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg" id="Page-1" fill="none" fill-rule="evenodd"><g id="041---Books" fill-rule="nonzero" fill="none"><path id="Shape" d="m50 13v12h-41.891c-2.82 0-5.109-2.688-5.109-6s2.289-6 5.109-6z" fill="#F5EFCA" data-original="#f5efca"/><path id="Shape" d="m52 26c-.0032948 1.1032019-.8967981 1.9967052-2 2h-41c-4.9705627-.0000001-8.99999987-4.0294373-8.99999987-9s4.02943717-8.9999999 8.99999987-9h41c1.1045695 0 1.9999999.8954305 1.9999999 2s-.8954304 2-1.9999999 2h-41c-2.76142375 0-5 2.2385763-5 5s2.23857625 5 5 5h41c1.1032019.0032948 1.9967052.8967981 2 2z" fill="#F29C1F" data-original="#f29c1f"/><rect id="Rectangle-path" fill="#7D6599" height="14" rx="2" width="54" x="4" y="28" data-original="#7d6599"/><rect id="Rectangle-path" fill="#E64C3C" height="14" rx="2" width="54" y="42" data-original="#e64c3c"/><rect id="Rectangle-path" fill="#3B97D3" height="10" rx="2" width="54" data-original="#3b97d3"/><path id="Rectangle-path" d="m8 0h4v10h-4z" fill="#67B9CC" data-original="#67b9cc"/><path id="Rectangle-path" d="m42 0h4v10h-4z" fill="#67B9CC" data-original="#67b9cc"/><rect id="Rectangle-path" fill="#9FC9D3" height="6" rx="1" width="24" x="19" y="32" data-original="#9fc9d3" class=""/><path id="Rectangle-path" d="m48 28h2v14h-2z" fill="#B49ACA" data-original="#b49aca"/><path id="Rectangle-path" d="m12 28h2v14h-2z" fill="#B49ACA" data-original="#b49aca"/><ellipse id="Oval" cx="27" cy="49" fill="#F5EFCA" rx="9" ry="3" data-original="#f5efca"/><g fill="#F29C1F"><path id="Rectangle-path" d="m6 42h4v14h-4z" fill="#F29C1F" data-original="#f29c1f"/><path id="Rectangle-path" d="m44 42h4v14h-4z" fill="#F29C1F" data-original="#f29c1f"/></g></g></g></g></svg>
            </div>
            <div>
              <h5 class="subject-card__title"> {{ $i18n.locale == 'ar' ? subject.nameAr : subject.nameEn }} </h5>
            </div>
            <div class="subject-card__content d-flex flex-row-reverse">
              <el-button @click="$router.push(`/subjects/${subject.id}`)"> {{ $t('subject.showContent') }} </el-button>
            </div>
          </div>
        </div>

      </div>


      <div class="center mt-4" v-if="totalPages > 1">
        <vs-pagination v-model="page" :length="totalPages" />
      </div>


    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";
export default {
  components: { Loading },
  middleware:['auth'],
  data(){
    return {
      subjects: [],
      isLoading: true,
      page: 1,
      totalPages: 1
    }
  },
  created(){
    this.getSubjects();
  },
  methods:{
    getSubjects(){
      this.$axios.get(`/student-subjects`).then(res => {
        this.subjects = res.data.docs;
        this.page = res.data.page;
        this.totalPages = res.data.totalPages;
      }).finally(() => this.isLoading = false)
    }
  }
}
</script>

<style lang="scss">
.title{
  color: #998ecb;
  font-weight: bold;
  margin-bottom: 15px;
}
.subject-card{
  padding: 18px;
  background: #FFF;
  gap:15px;
  &__title{
    margin-bottom: 0;
    margin-top: 8px;
  }
  &__content{
    flex: 1
  }
}
</style>
