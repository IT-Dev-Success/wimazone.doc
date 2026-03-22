<script setup>
import { ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const releases = ref([])
const loading = ref(true)
const error = ref(null)
const { lang } = useData()

const t = {
    fr: {
        loading: 'Chargement des versions...',
        error: 'Erreur',
        latest: 'Dernière',
        prerelease: 'Pré-version',
        changelog: 'Changelog',
        empty: 'Aucune version trouvée.'
    },
    mg: {
        loading: 'Mamorona ny version...',
        error: 'Hadisoana',
        latest: 'Farany',
        prerelease: 'Alohan\'ny famoahana',
        changelog: 'Changelog',
        empty: 'Tsy misy version hita.'
    }
}

const isFrench = () => (lang.value || '').toLowerCase().startsWith('fr')
const label = (key) => (isFrench() ? t.fr[key] : t.mg[key])

onMounted(async () => {
    try {
        const res = await fetch(withBase('/registry/releases.json'))
        if (!res.ok) throw new Error('Failed to load releases')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
            releases.value = data
        } else {
            error.value = label('empty')
        }
    } catch (e) {
        error.value = e.message
        console.error(e)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="release-archive">
        <div v-if="loading" class="text-center p-4 text-accents-5">{{ label('loading') }}</div>
        <div v-else-if="error" class="text-error p-4">{{ label('error') }}: {{ error }}</div>

        <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-accents-2">
                        <th class="py-2 px-4 font-semibold">Version</th>
                        <th class="py-2 px-4 font-semibold">Date</th>
                        <th class="py-2 px-4 font-semibold text-right"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="release in releases" :key="release.version" class="border-b border-accents-2 hover:bg-accents-1 transition-colors">
                        <td class="py-3 px-4">
                            <span class="font-mono font-bold">{{ release.version }}</span>
                            <span v-if="release.latest" class="ml-2 text-xs px-2 py-0.5 rounded-full" style="background-color: var(--vp-c-brand-soft); color: var(--vp-c-brand-1);">{{ label('latest') }}</span>
                            <span v-if="release.prerelease" class="ml-2 text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">{{ label('prerelease') }}</span>
                        </td>
                        <td class="py-3 px-4 text-sm text-accents-5">{{ release.date }}</td>
                        <td class="py-3 px-4 text-right">
                            <a v-if="release.notes" :href="release.notes" target="_blank" class="text-accents-4 hover:text-foreground text-sm">{{ label('changelog') }}</a>
                        </td>
                    </tr>
                    <tr v-if="releases.length === 0">
                        <td colspan="3" class="text-center py-8 text-accents-4 italic">{{ label('empty') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.text-error { color: var(--vp-c-danger-1); }
</style>
