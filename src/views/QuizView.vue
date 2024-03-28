<script setup>
import { useRoute } from "vue-router";
import Question from "@/components/Question.vue";
import QuizHeader from "@/components/QuizHeader.vue";
import Result from "@/components/Result.vue";
import quizes from "../data/quizes.json";
import { ref, watch, computed } from "vue";

const route = useRoute();
const quizId = parseInt(route.params.id);
const quiz = quizes.find((quiz) => quiz.id === quizId);
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);
const showResults = ref(false);

// const questionStatus = `${currentQuestionIndex.value}/${quiz.questions.length}`;
// // il primo parametro del watch è una funzione che restituisce il valore di ciò che noi vogliamo osservare,
// il secondo è la funzione di ciò che vogliamo avvenga ogni qual volta il parametro osservato cambia
// // in generale il watch è usato ogni volta che vogliamo fare qualcosa quando uno state cambia
// watch(
//   () => currentQuestionIndex.value,
//   () => { questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}` }
// );

// In termini di codice, è più opportuno usare il computed, soprattutto perchè noi ricerchiamo solamente l'aggiornamento del value, usare il watch sarebbe eccessivo. Così abbiamo meno righe di codice,
const questionStatus = computed(
  () => `${currentQuestionIndex.value}/${quiz.questions.length}`
);
const barPercentage = computed(
  () => `${(currentQuestionIndex.value / quiz.questions.length) * 100}%`
);

const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }
  if (quiz.questions.length - 1 === currentQuestionIndex.value) {
    showResults.value = true;
  }
  currentQuestionIndex.value++;
};
</script>

<template>
  <div>
    <QuizHeader
      :questionStatus="questionStatus"
      :barPercentage="barPercentage"
    />
    <div>
      <Question
        v-if="!showResults"
        :question="quiz.questions[currentQuestionIndex]"
        @selectOption="onOptionSelected"
      />
      <Result
        v-else
        :numberOfCorrectAnswers="numberOfCorrectAnswers"
        :totalQuestionsNumber="quiz.questions.length"
      />
    </div>
  </div>
</template>

<style scoped></style>
