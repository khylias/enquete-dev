<template>
    <div>
        <header-main />
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="text-center">
                <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span class="block">Enquete.dev</span>
                    <span class="block text-indigo-600">Les réponses au métier de développeur</span>
                </h1>
                <span class="text-center text-indigo-400 mt-2 font-semibold text-sm italic">(par des développeurs)</span>
                <p class="mt-3 text-center text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                </p>
            </div>
            <section>
                <ul class="flex flex-wrap mb-4 text-center">
                    <li
                        v-for="tag of questions"
                        :key="tag.slug"
                        class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"
                    >
                        <NuxtLink
                            :to="`/blog/tag/${tag.slug}`"
                            class=""
                        >
                            <p class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss">
                                {{ tag.name }}
                            </p>
                        </NuxtLink>
                    </li>
                </ul>
            </section>
        </main>
        <footer-main />
    </div>
</template>

<script lang="ts">
import FooterVue from "../components/Footer.vue";
import HeaderVue from "../components/Header.vue";

export default {
    components: {
        "header-main": HeaderVue,
        "footer-main": FooterVue,
    },
    async asyncData({ $content }: any) {
        const answers = await $content("answers")
            .only(["title", "description", "img", "slug", "author"])
            .sortBy("createdAt", "desc")
            .fetch();
        const questions = await $content("questions")
            .only(["name", "description", "img", "slug"])
            .sortBy("createdAt", "asc")
            .fetch();
        return {
            answers,
            questions
        };
    },
    data() {
        return {
            questions: [],
            asnwers: []
        }
    }
};
</script>
