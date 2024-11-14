import type { ApiError, ApiResponse } from '@/types/types'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type RawAxiosRequestHeaders } from 'axios'
import { toast } from 'vue-sonner'
import { isRef, type ComputedRef, type Reactive, type Ref } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { keyNames } from '@/enums/keyNames'
import { apiNames } from '@/enums/apiNames'
import type { tableNames } from '@/enums/tableNames'

export function submitToastHandler<T>(handler: Promise<AxiosResponse<ApiResponse<T>>>, loading: string, successf: (res: AxiosResponse<ApiResponse<T>>) => string, errorf: (error: Record<string, string> | string) => string) {
  return toast.promise(handler,
    {
      loading,
      success: (res: AxiosResponse<ApiResponse<T>>) => successf(res),
      error: (error: AxiosError<ApiError>) => {
        if (!error.isAxiosError) {
          return errorf('Problemas externos encontrados')
        }
        if (!error.response) {
          return errorf('Problema de conexión. Por favor, verifica tu red.')
        }
        if (!!error.status && error.status === 403) {
          return errorf('No tiene permisos para realizar esta acción.')
        }
        if (!!error.status && error.status >= 500) {
          return error.message
        }
        const formattedErrors = Object.entries(error.response.data.errors).reduce((acc, [key, value]) => {
          acc[key] = value[0]
          return acc
        }, {} as Record<string, string>)

        return errorf(formattedErrors)
      },
    }
  )
}

export async function fetchData<T>(uri: string): Promise<ApiResponse<T>> {
  const response: AxiosResponse<ApiResponse<T>> = await window.axios.get(uri)
  return response.data
}

export function useFetchData<T>(
  keyName: string,
  fetcher: () => Promise<ApiResponse<T>>,
  filterParams: Reactive<Record<string, number | string>>
): { isFetching: Ref<boolean>, data: Ref<ApiResponse<T> | undefined>, isPlaceholderData: Ref<boolean> } {

  return useQuery({
    queryKey: [keyName, filterParams],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  })
}

export function useModifyData<T>(keyName: string, params: ComputedRef<AxiosRequestConfig> | AxiosRequestConfig, header?: RawAxiosRequestHeaders) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: T) => {
      const paramsToUse = isRef(params) ? params.value : params

      if (!!header) {
        paramsToUse.headers = header
      }

      return window.axios({
        ...paramsToUse,
        data: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyName] })
    },
  })
}

export function useChangeStatus(keyName: string, table: tableNames) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { id: number, state: boolean }) => {
      return window.axios.patch(apiNames.change_status, { table, id: data.id, is_active: data.state })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyName] })
    }
  })
}

export function capitalizeFirstLetterOfEachWord(sentence: string): string {
  return !!sentence ? sentence.split(' ').map(word => !!word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '').join(' ') : ''
}

export async function searchDoc(
  document: number,
  onRazonSocial: (razonSocial: string) => void,
  onNombres: (nombres: string, apellidoPaterno: string, apellidoMaterno: string) => void
) {

  const documentString = document.toString()

  if (![8, 11].includes(documentString.length)) return

  const endpoint = documentString.length === 8
    ? `/api/inquiry/dni?dni=${document}`
    : `/api/inquiry/ruc?ruc=${document}`

  return toast.promise(window.axios.get(endpoint),
    {
      loading: 'Buscando documento...',
      success: (api: AxiosResponse<{ original: { razonSocial?: string, nombres?: string, apellidoPaterno?: string, apellidoMaterno?: string } }>) => {
        if (!!api.data.original?.razonSocial) {
          onRazonSocial(api.data.original.razonSocial)
        } else if (!!api.data.original?.nombres) {
          onNombres(capitalizeFirstLetterOfEachWord(api.data.original.nombres), capitalizeFirstLetterOfEachWord(api.data.original.apellidoPaterno || ''), capitalizeFirstLetterOfEachWord(api.data.original.apellidoMaterno || ''))
        } else {
          throw new Error()
        }
        return 'Documento encontrado'
      },
      error: () => {
        toast.info('Documento inválido o no encontrado', {
          description: 'No se encontraron datos relacionados a este número de documento',
        })
        return 'Error en la búsqueda'
      },
    }
  )
}

export function callPerson(number: string): string {
  return `tel:+51${number}`
}

export function messagePerson(number: string, message: string = ''): string {
  return `https://wa.me/+51${number}${message}`
}

type Mode = 'exact' | 'start' | 'end'

function setTimeMode(date: string, mode: Mode): string {
  return mode === 'start' ? date + 'T00:00:00' : mode === 'end' ? date + 'T23:59:59' : date
}

export function getLocaleDate(date: string, mode: Mode = 'exact') {
  const dateValue = setTimeMode(date, mode)
  const newDate = new Date(dateValue).toLocaleDateString(keyNames.lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return newDate
}

export function formatDateToDateString(dateObj: { year: number, month: number, day: number }, mode: Mode = 'start'): string {
  const { year, month, day } = dateObj
  const date = new CalendarDate(year, month, day)
  return setTimeMode(date.toString(), mode)
}

export function transformDateToText(dateObj: { year: number, month: number, day: number } | undefined) {
  if (!dateObj) return dateObj
  return new Intl.DateTimeFormat(keyNames.lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(formatDateToDateString(dateObj)))
}

const timesUnit = [
  { limit: 60, unit: "second", divider: 1 },
  { limit: 3600, unit: "minute", divider: 60 },
  { limit: 86400, unit: "hour", divider: 3600 },
  { limit: 604800, unit: "day", divider: 86400 },
  { limit: 2419200, unit: "week", divider: 604800 },
  { limit: 29030400, unit: "month", divider: 2419200 },
]

function formatTime(value: number, unit: Intl.RelativeTimeFormatUnit): string {
  const rtf = new Intl.RelativeTimeFormat(keyNames.lang, { numeric: "auto" })
  return rtf.format(-value, unit)
}

export const dateCalculator = (date: string) => {
  const ISOdate = new Date(date)
  const currentDate = new Date()
  const ISOdateTest = new Date(date)
  const currentDateTest = new Date()

  ISOdateTest.setHours(0, 0, 0, 0)
  currentDateTest.setHours(0, 0, 0, 0)

  let miliSecondsDifference = currentDateTest.getTime() - ISOdateTest.getTime()
  const diasPasados = Math.floor(
    miliSecondsDifference / (1000 * 60 * 60 * 24)
  )

  if (!(diasPasados >= 2)) {
    miliSecondsDifference = currentDate.getTime() - ISOdate.getTime()
  }

  const seconds = Math.floor(miliSecondsDifference / 1000)

  let value: string = ''

  for (const timeUnit of timesUnit) {
    if (seconds < timeUnit.limit && seconds >= 0) {
      const date =
        timeUnit.limit / timeUnit.divider -
        (timeUnit.limit - seconds) / timeUnit.divider;
      value = formatTime(Math.trunc(date), timeUnit.unit as Intl.RelativeTimeFormatUnit)
      break
    }

    if (-seconds < timeUnit.limit && seconds < 0) {
      const date =
        timeUnit.limit / timeUnit.divider -
        (timeUnit.limit - seconds) / timeUnit.divider;
      value = formatTime(Math.trunc(date), timeUnit.unit as Intl.RelativeTimeFormatUnit)
      break
    }
  }

  return value
}
