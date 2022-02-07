import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (!headers['Content-Type']) {
                (headers['Content-Type'] = 'application/json')
            }
            if (body && headers['Content-Type'] === 'application/json') {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Запрос на сервер не удалось выполнить')
            }

            setLoading(false)

            return data
        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}