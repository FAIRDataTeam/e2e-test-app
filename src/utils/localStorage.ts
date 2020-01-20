const selectedBranchKey = 'selected-branch'
const selectedImageKey = repo => `value-${repo}`

export default {
  getSelectedBranch(): string {
    return localStorage.getItem(selectedBranchKey) || 'master'
  },

  setSelectedBranch(branch: string): void {
    localStorage.setItem(selectedBranchKey, branch)
  },

  getSelectedImage(repo: string): string {
    return localStorage.getItem(selectedImageKey(repo))
  },

  setSelectedImage(repo: string, image: string): void {
    localStorage.setItem(selectedImageKey(repo), image)
  },
}
