<template>
  <div class="question">
    <div class="showQuestionMark mb-3">
      <span>{{ $i18n.locale == "ar" ? "الدرجة:" : "Degree:" }}</span>
      {{ question.mark }} / {{ question.point }}
    </div>

    <div>
      <div class="container-fluid">
        <div class="row" v-if="question.question.image != null">
          <div class="col-md-4 p-0">
            <p class="textQuestion">{{ question.question.head }}</p>
          </div>
          <div
            class="col-md-8"
            style="display: flex; align-items: center; justify-content: center"
          >
            <img :src="question.question.image" alt="" class="img-fluid" />
          </div>
        </div>
        <div class="row mb-5" v-else>
          <div class="col-md-12 p-0">
            <p class="textQuestion">{{ question.question.head }}</p>
          </div>
        </div>
      </div>

      <!--paragraph-->
      <div v-if="question.question.type == 'paragraph'">
        <p class="orangeColor">{{ $t("auth.answerHere") }}</p>
        <textarea
          v-if="!showModelAnswer"
          @blur="postSolution()"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="question.answer"
          class="form-control"
        ></textarea>

        <div v-else>
          <div
            v-if="
              !question.question.modelAnswer.startsWith(
                `https://res.cloudinary.com/`
              )
            "
          >
            <h6 style="color: var(--yellow)">
              {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Solution" }}
            </h6>
            <p>
              {{ question.answer }}
            </p>
            <img  style="width: 100px;height: 100px;object-fit: cover;margin-bottom: 10px!important;margin-top: 10px;" v-if="question.answerImage" :src="question.answerImage" alt="" />
            
            <h6 style="color: var(--yellow)">
              {{
                $i18n.locale == "ar" ? "الإجابة النموذجية :" : "Model Answer"
              }}
            </h6>

            <p>
              {{ question.question.modelAnswer }}
            </p>
          </div>
          <div v-else>
            
            <img style="width: 100px;height: 100px;object-fit: cover;margin-bottom: 10px!important;margin-top: 10px;" :src="question.question.modelAnswer" alt="" />
          </div>


        </div>
      </div>

      <!--voice-->
      <div v-if="question.question.type == 'voice'">
        <audio controls :src="question.question.attachment">
          Your browser does not support the audio element.
        </audio>

        <p class="orangeColor">{{ $t("auth.answerHere") }}</p>
        <textarea
          v-if="!showModelAnswer"
          @blur="postSolution()"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="question.answer"
          class="form-control"
        ></textarea>

        <div v-else>
          <div
            v-if="
              !question.question.modelAnswer.startsWith(
                `https://res.cloudinary.com/`
              )
            "
          >
            <h6 style="color: var(--yellow)">
              {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Solution" }}
            </h6>
            <p>
              {{ question.answer }}
            </p>
            <h6 style="color: var(--yellow)">
              {{
                $i18n.locale == "ar" ? "الإجابة النموذجية :" : "Model Answer"
              }}
            </h6>

            <p>
              {{ question.question.modelAnswer }}
            </p>
          </div>
          <div v-else>
            <h6 style="color: var(--yellow)">
              {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Solution" }}
            </h6>
            <p>
              {{ question.answer }}
            </p>

            <img :src="question.question.modelAnswer" alt="" />
          </div>
        </div>
      </div>

      <!--complete-->
      <div
        class="container-fluid p-0"
        v-else-if="question.question.type == 'complete'"
      >
        <p class="orangeColor">{{ $t("auth.complete") }}</p>
        <div class="row" v-if="!showModelAnswer">
          <div
            class="col-md-6"
            v-for="(x, i) in question.question.numberOfInputs"
            :key="i"
          >
            <input
              class="form-control mb-2"
              v-model="question.answer[i]"
              @blur="postSolution"
            />
          </div>
        </div>

        <div v-else>
          <div>
            <h6 style="color: var(--yellow)">
              {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Solution" }}
            </h6>

            <img style="width: 100px;height: 100px;object-fit: cover;margin-bottom: 10px!important;margin-top: 10px;" v-if="question.answerImage" :src="question.answerImage" alt="" />


            <ul style="list-style-type: circle" v-for="(x, i) in question.question.numberOfInputs" :key="i">
              <li>
                {{ question.answer[i] }}
              </li>
            </ul>
            
            <h6 style="color: var(--yellow)">
              {{
                $i18n.locale == "ar" ? "الإجابة النموذجية :" : "Model Answer"
              }}
            </h6>
            
            
            <ul style="list-style-type: circle" v-for="(x, i) in question.question.numberOfInputs" :key="i">
              <li>
                {{ question.question.modelAnswer[i] }}
              </li>
            </ul>

          </div>
        </div>
      </div>
      <!--true and false-->
      <div
        class="radio container-fluid p-0"
        v-else-if="question.question.type == 'truefalse'"
      >
        <p class="orangeColor">{{ $t("auth.choose") }}</p>

        <el-radio-group
          v-if="!showModelAnswer"
          @change="postSolution"
          style="width: 100%"
          v-model="question.answer"
          size="medium"
        >
          <div class="row">
            <div class="col-md-4">
              <el-radio :label="true">{{ $t("auth.true") }}</el-radio>
            </div>
            <div class="col-md-4">
              <el-radio :label="false">{{ $t("auth.false") }}</el-radio>
            </div>
          </div>
        </el-radio-group>

        <el-radio-group
          v-else
          style="width: 100%"
          :value="question.answer"
          size="medium"
        >
          <div>
            <h6>
              {{
                $i18n.locale == "ar" ? "الإجابة الصحيحة :" : "The Right Answer"
              }}
              <span v-if="question.question.modelAnswer">
                {{ $i18n.locale == "ar" ? "صح" : "True" }}
              </span>
              <span v-else> {{ $i18n.locale == "ar" ? "خطأ" : "False" }} </span>
            </h6>
          </div>
          <div class="row">
            <div class="col-md-4">
              <el-radio :label="true">{{ $t("auth.true") }}</el-radio>
            </div>
            <div class="col-md-4">
              <el-radio :label="false">{{ $t("auth.false") }}</el-radio>
            </div>
          </div>
        </el-radio-group>
      </div>

      <!--choose-->
      <div
        class="choose container-fluid p-0"
        v-else-if="question.question.type == 'choose'"
      >
        <p class="orangeColor">{{ $t("auth.choose") }}</p>
        <div class="row">
          <template v-if="!showModelAnswer">
            <div
              class=""
              v-for="(ans, i) in question.question.choices"
              :key="i"
              :class="['col-md-6']"
            >
              <div
                @click="postSolution(i)"
                :class="[
                  'answer',
                  'd-flex',
                  (question.question.active !== null &&
                  question.question.active >= 0
                    ? question.question.active
                    : question.answer) == i
                    ? 'selected'
                    : '',
                ]"
              >
                <div class="index">{{ i + 1 }}</div>
                <p>{{ ans }}</p>
              </div>
            </div>
          </template>

          <!-- Show Question Model Answer -->
          <template v-else>
            <div
              class=""
              v-for="(ans, i) in question.question.choices"
              :key="i"
              :class="['col-md-6']"
            >
              <div
                :class="[
                  'answer',
                  'd-flex',
                  {
                    right_answer: question.question.modelAnswer === i,
                    wrong_answer:
                      question.answer === i &&
                      question.answer !== question.question.modelAnswer,
                  },
                ]"
              >
                <div class="index">{{ i + 1 }}</div>
                <p>{{ ans }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Start Of Group Question  -->

      <div v-if="question.question.type == 'group'" class="mb-5">
        <section v-for="child in question.childrenQuestions" :key="child.id">
          <!--paragraph-->
          <div v-if="child.child.type == 'paragraph'">
            <div class="showQuestionMark">
              <span> {{ $i18n.locale == "ar" ? "الدرجة:" : "Degree:" }} </span>
              {{ child.mark }} / {{ child.point }}
            </div>

            <p class="orangeColor">{{ child.child.head }}</p>
            <textarea
              v-if="!showModelAnswer"
              @blur="postChildSolution('', child)"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="child.answer"
              class="form-control"
            ></textarea>

            <div v-else>
              <div
                v-if="
                  !child.child.modelAnswer.startsWith(
                    `https://res.cloudinary.com/`
                  )
                "
              >
                <h6 style="color: var(--yellow)">
                  {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Answer" }}
                </h6>
                <p>
                  {{ child.answer }}
                </p>
                <h6 style="color: var(--yellow)">
                  {{
                    $i18n.locale == "ar"
                      ? "الإجابة النموذجية :"
                      : "Model Answer"
                  }}
                </h6>

                <p>
                  {{ child.child.modelAnswer }}
                </p>
              </div>
              <div v-else>
                <h6 style="color: var(--yellow)">إجابتك :</h6>
                <p>
                  {{ child.answer }}
                </p>

                <img :src="child.child.modelAnswer" alt="" />
              </div>
            </div>
          </div>

          <!--voice-->
          <div v-if="child.child.type == 'voice'">
            <div class="showQuestionMark">
              <span>{{ $i18n.locale == "ar" ? "الدرجة:" : "Degree:" }}</span>
              {{ child.mark }} / {{ child.point }}
            </div>

            <audio controls :src="child.child.attachment">
              Your browser does not support the audio element.
            </audio>

            <p class="orangeColor">{{ $t("auth.answerHere") }}</p>
            <textarea
              v-if="!showModelAnswer"
              @blur="postSolution()"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="child.answer"
              class="form-control"
            ></textarea>

            <div v-else>
              <div
                v-if="
                  !child.child.modelAnswer.startsWith(
                    `https://res.cloudinary.com/`
                  )
                "
              >
                <h6 style="color: var(--yellow)">
                  {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Answer" }}
                </h6>
                <p>
                  {{ child.answer }}
                </p>
                <h6 style="color: var(--yellow)">
                  {{
                    $i18n.locale == "ar"
                      ? "الإجابة النموذجية :"
                      : "Model Answer"
                  }}
                </h6>

                <p>
                  {{ child.child.modelAnswer }}
                </p>
              </div>
              <div v-else>
                <h6 style="color: var(--yellow)">
                  {{ $i18n.locale == "ar" ? "إجابتك :" : "Your Answer" }}
                </h6>
                <p>
                  {{ child.answer }}
                </p>

                <img :src="child.child.modelAnswer" alt="" />
              </div>
            </div>
          </div>

          <!--complete-->
          <div
            class="container-fluid p-0"
            v-else-if="child.child.type == 'complete'"
          >
            <div class="showQuestionMark">
              <span>الدرجة:</span> {{ child.mark }} / {{ child.point }}
            </div>

            <p class="orangeColor">{{ child.child.head }}</p>
            <div class="row">
              <div
                class="col-md-6"
                v-for="(x, i) in child.child.numberOfInputs"
                :key="i"
              >
                <input
                  v-if="!showModelAnswer"
                  class="form-control"
                  v-model="child.answer[i]"
                  @blur="postChildSolution('', child)"
                />
                <div v-else>{{ child.answer[i] }}</div>
              </div>
            </div>
          </div>
          <!--true and false-->
          <div
            class="radio container-fluid p-0"
            v-else-if="child.child.type == 'truefalse'"
          >
            <div class="showQuestionMark">
              <span>{{ $i18n.locale == "ar" ? "الدرجة:" : "Degree: " }}</span>
              {{ child.mark }} / {{ child.point }}
            </div>

            <p class="orangeColor">{{ child.child.head }}</p>

            <el-radio-group
              v-if="!showModelAnswer"
              @change="postChildSolution('', child)"
              style="width: 100%"
              v-model="child.answer"
              size="medium"
            >
              <div class="row">
                <div class="col-md-4">
                  <el-radio :label="true">{{ $t("auth.true") }}</el-radio>
                </div>
                <div class="col-md-4">
                  <el-radio :label="false">{{ $t("auth.false") }}</el-radio>
                </div>
              </div>
            </el-radio-group>

            <el-radio-group
              v-else
              style="width: 100%"
              :value="child.answer"
              size="medium"
            >
              <div>
                <h6>
                  {{
                    $i18n.locale == "ar"
                      ? "الإجابة الصحيحة:"
                      : "The Right Answer: "
                  }}
                  <span v-if="child.child.modelAnswer">
                    {{ $i18n.locale == "ar" ? "صح" : "True" }}
                  </span>
                  <span v-else>
                    {{ $i18n.locale == "ar" ? "خطأ" : "False" }}
                  </span>
                </h6>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <el-radio :label="true">{{ $t("auth.true") }}</el-radio>
                </div>
                <div class="col-md-4">
                  <el-radio :label="false">{{ $t("auth.false") }}</el-radio>
                </div>
              </div>
            </el-radio-group>
          </div>

          <!--choose-->
          <div
            class="choose container-fluid p-0"
            v-else-if="child.child.type == 'choose'"
          >
            <div class="showQuestionMark">
              <span> {{ $i18n.locale == "ar" ? "الدرجة:" : "Degree: " }} </span>
              {{ child.mark }} / {{ child.point }}
            </div>

            <p class="orangeColor">{{ child.child.head }}</p>
            <div class="row">
              <template v-if="!showModelAnswer">
                <div
                  class=""
                  v-for="(ans, i) in child.child.choices"
                  :key="i"
                  :class="['col-md-6']"
                >
                  <div
                    @click="postChildSolution(i, child)"
                    :class="[
                      'answer',
                      'd-flex',
                      (child.child.active != null && child.child.active >= 0
                        ? child.child.active
                        : child.answer) == i
                        ? 'selected'
                        : '',
                    ]"
                  >
                    <div class="index">{{ i + 1 }}</div>
                    <p>{{ ans }}</p>
                  </div>
                </div>
              </template>

              <!-- Show Question Model Answer -->
              <template v-else>
                <div
                  class=""
                  v-for="(ans, i) in child.child.choices"
                  :key="i"
                  :class="['col-md-6']"
                >
                  <div
                    :class="[
                      'answer',
                      'd-flex',
                      {
                        right_answer: child.child.modelAnswer === i,
                        wrong_answer:
                          child.answer === i &&
                          child.answer !== child.child.modelAnswer,
                      },
                    ]"
                  >
                    <div class="index">{{ i + 1 }}</div>
                    <p>{{ ans }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>
      </div>

      <p class="orangeColor" v-if="!showModelAnswer && question.question.type != 'truefalse' && question.question.type != 'choose' && question.question.type != 'group'">
        {{
          $i18n.locale == "ar"
            ? "إرفاق صورة بالحل"
            : "Attach Your Image Solution"
        }}
      </p>
      <div class="uploader" v-if="!showModelAnswer && question.question.type != 'truefalse' && question.question.type != 'choose' && question.question.type != 'group'">
        <input type="file" @change="setPhotoAnswer" name="" id="" />
        <div v-if="question.url">
          <img :src="question.url" style="max-width: 100%; max-height: 100%" alt="">
        </div>
        <div v-else>
          <i class="fas fa-upload"></i>
        </div>
      </div>


      
     

      <!-- End Of Group Question -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["question", "showModelAnswer", "exam"],
  data() {
    return {
      // picked: null,
      value: 15,
      max: 25,
      selected: null,
      generalAnswer: "",
      completeAnswer: [],
      // generalAnswer: null,
      answerQu: "",
      selectedExam: null,
      active_choose: null,
      fileList: [],
      url: "",
    };
  },

  computed: {
    picked() {
      return this.questions && this.questions.length > 0 && question.answer;
    },
  },
  mounted(){
    
    if(this.question.answerImage && typeof this.question.answerImage == 'object'){
      this.question.url = URL.createObjectURL(this.question.answerImage)
    }else{
      this.question.url = this.question.answerImage;
    }
  },
  watch: {
    picked() {
      this.getAnswerOfTF();
    },
  },
  methods: {
    setPhotoAnswer(e){
      if(e.target.files.length > 0){
        this.question.answerImage = e.target.files[0];
        this.question.url = URL.createObjectURL(this.question.answerImage);
        if(this.question.question.type == 'choose'){
          this.postSolution(this.question.answer >= 0 ? this.question.answer : '');
        }else{
          this.postSolution()
        }
      }
    },
    handleRemove() {
      console.log("hi");
      this.question.answerImage = null;
      this.postSolution();
    },

    handlePictureCardPreview(file) {
      console.log("hi");
      this.question.answerImage = file.raw;
    },

    postSolution(answer = "") {
      if (this.question && !this.question.question) {
        return;
      }

      if (answer >= 0) {
        this.question.question.active = answer;
      }
      this.selectedExam = this.index;
      let formData = new FormData();

      formData.append("question", this.question.question.id);
      if (this.question && this.question.question.type == "choose") {
        formData.append("answer", answer);
        this.question.answer = answer;
      } else if (
        (this.question && this.question.question.type == "paragraph") ||
        this.question.question.type == "truefalse" ||
        this.question.question.type == "voice"
      ) {
        formData.append("answer", this.question.answer);
      } else if (this.question && this.question.question.type == "complete") {
        for (var i = 0; i < this.question.question.numberOfInputs; i++) {
          if (this.question.answer[i])
            formData.append(`answer[${i}]`, this.question.answer[i]);
        }
      }

      if (this.question.answerImage) {
        formData.append("answerImage", this.question.answerImage);
      }

      if (this.exam.id) {
        this.$axios
          .patch(`/exams/${this.exam.id}/solutions`, formData)
          .then((res) => {
            // this.$axios.get(`/exams/${this.val}`).then((res) => {
            //   this.currentIndex = 0;
            // });
          });
      }
    },

    postChildSolution(answer = "", child) {
      if (child && !child.child) {
        return;
      }
      if (answer >= 0) {
        child.child.active = answer;
      }
      this.selectedExam = this.index;
      let formData = new FormData();

      formData.append("question", child.child.id);
      if (child && child.child.type == "choose") {
        formData.append("answer", answer);
      } else if (
        (child && child.child.type == "paragraph") ||
        child.child.type == "truefalse" ||
        child.child.type == "voice"
      ) {
        formData.append("answer", child.answer);
      } else if (child && child.child.type == "complete") {
        for (var i = 0; i < child.child.numberOfInputs; i++) {
          if (child.answer[i]) formData.append(`answer[${i}]`, child.answer[i]);
        }
      }

      if (this.exam.id) {
        this.$axios
          .patch(`/exams/${this.exam.id}/solutions`, formData)
          .then((res) => {
            // this.$axios.get(`/exams/${this.val}`).then((res) => {
            //   this.currentIndex = 0;
            // });
          });
      }
    },
    // getAnswerOfGeneral() {
    //   let formData = new FormData();

    //   if (this.exam.id) {
    //     this.$axios
    //       .patch(`/exams/${this.exam.id}/solutions`, formData)
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   }
    // },
    // getAnswerOfTF() {
    //   let formData = new FormData();
    //   formData.append("question", this.question.question.id);
    //   formData.append("answer", this.question.answer);
    //   if (this.exam.id) {
    //     this.$axios
    //       .patch(`/exams/${this.exam.id}/solutions`, formData)
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   }
    // },
    // getAnswerOfcomplete() {
    //   let formData = new FormData();
    //   formData.append("question", this.question.question.id);
    //   for (var i = 0; i < this.completed.length; i++) {
    //     formData.append("answer", this.completed[i]);
    //   }
    //   if (this.val) {
    //     this.$axios
    //       .patch(`/exams/${this.exam.id}/solutions`, formData)
    //       .then((res) => {
    //         console.log(res.data);
    //       });
    //   }
    // },
  },
};
</script>

<style lang="scss">
.radio {
  .el-radio__input {
    margin: 0 12px;
  }
}

.question {
  .el-upload.el-upload--picture-card {
    text-align: center !important;
  }
  .right_answer.answer {
    background-color: #f6fdfa !important;
    .index {
      background: #45d7b6 !important;
      color: #fff !important;
      border: none !important;
    }
  }
  .wrong_answer.answer {
    background-color: #ffeeef !important;
    .index {
      background: #fa5b5a !important;
      color: #fff !important;
      border: none !important;
    }
  }

  .showQuestionMark {
    text-align: end;
    span {
      color: #f28227 !important;
      font-size: 18px !important;
    }
  }
}

.uploader {
  position: relative;
  height: 172px;
  width: 173px;
  border: 1px dashed #f8b257a1;
  border-radius: 10px;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: #f8b257a1;
    }
  }
}
</style>
