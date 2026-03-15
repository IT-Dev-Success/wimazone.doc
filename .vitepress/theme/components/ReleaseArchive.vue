<script setup>
import { ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const releases = ref([])
const loading = ref(true)
const error = ref(null)
const { lang } = useData()

const t = {
    fr: {
        loading: 'Chargement des archives...',
        error: 'Erreur',
        size: 'Taille',
        action: 'Action',
        latest: 'Dernière',
        prerelease: 'Pré-version',
        download: 'Télécharger',
        notes: 'Notes',
        empty: 'Aucune version trouvée.'
    },
    en: {
        loading: 'Loading archive...',
        error: 'Error',
        size: 'Size',
        action: 'Action',
        latest: 'Latest',
        prerelease: 'Pre-release',
        download: 'Download',
        notes: 'Notes',
        empty: 'No releases found.'
    }
}

const isFrench = () => (lang.value || '').toLowerCase().startsWith('fr')
const label = (key) => (isFrench() ? t.fr[key] : t.en[key])

const fallbackRepo = 'ITDev-Success/billing'

const loadFromGithubReleases = async () => {
    const res = await fetch(`https://api.github.com/repos/${fallbackRepo}/releases?per_page=30`)
    if (!res.ok) throw new Error('Failed to load releases')
    const ghReleases = await res.json()
    const mapped = ghReleases.map((rel) => {
        const firstAsset = Array.isArray(rel.assets) && rel.assets.length > 0 ? rel.assets[0] : null
        return {
            version: rel.tag_name || rel.name || 'unknown',
            date: (rel.published_at || rel.created_at || '').slice(0, 10),
            size: firstAsset?.size ?? 0,
            download: firstAsset?.browser_download_url || rel.zipball_url || rel.html_url,
            notes: rel.html_url,
            prerelease: Boolean(rel.prerelease),
            latest: false
        }
    })
    const firstStableIndex = mapped.findIndex((r) => !r.prerelease)
    if (firstStableIndex >= 0) {
        mapped[firstStableIndex].latest = true
    }
    return mapped
}

const formatSize = (bytes) => {
    if (bytes === 0) return '-'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

onMounted(async () => {
    try {
        const res = await fetch(withBase('/registry/releases.json'))
        if (!res.ok) throw new Error('Failed to load releases')
        releases.value = await res.json()
    } catch (e) {
        try {
            releases.value = await loadFromGithubReleases()
        } catch (fallbackError) {
            error.value = fallbackError.message
            console.error(fallbackError)
        }
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
                        <th class="py-2 px-4 font-semibold">{{ label('size') }}</th>
                        <th class="py-2 px-4 font-semibold text-right">{{ label('action') }}</th>
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
                        <td class="py-3 px-4 text-sm font-mono text-accents-5">{{ formatSize(release.size) }}</td>
                        <td class="py-3 px-4 text-right">
                            <a :href="release.download" class="text-brand hover:underline text-sm font-medium mr-4">{{ label('download') }}</a>
                            <a :href="release.notes" target="_blank" class="text-accents-4 hover:text-foreground text-sm">{{ label('notes') }}</a>
                        </td>
                    </tr>
                   <tr v-if="releases.length === 0">
                        <td colspan="4" class="text-center py-8 text-accents-4 italic">{{ label('empty') }}</td>
                   </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* Scoped styles if needed, mostly utilizing VP classes or Tailwind utilities assuming availability */
.text-error { color: var(--vp-c-danger-1); }
</style>
