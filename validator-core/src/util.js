import { pickBy } from 'lodash'
import minimatch from 'minimatch'

// Wrapper function to simplify file handling in the check functions
export const makeCheck = (fn, { glob='**/*.*', mode='global' }) =>
  async (files, options) => {
    // Filter files according to the glob pattern
    const filteredFiles = pickBy(files, (_, path) => minimatch(path, glob))

    // Apply filter to all files individually, or pass through all files
    if (mode === 'per_file') {
      return await Promise.all(
        Object.entries(filteredFiles).map(f => fn(f, options))
      )
    } else {
      return await fn(filteredFiles, options)
    }
  }