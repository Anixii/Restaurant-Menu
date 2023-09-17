import React, { useEffect, useState } from 'react'
import s from './AdminPage.module.css'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { Button, Upload } from 'antd'  
import Select from 'react-select';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectOptions } from '../../store/userSlice';
import { createNewDishes } from '../../store/menuSlice';
const AdminPage = () => { 
    const dispatch = useDispatch()
    const [photoFiles, setPhotoFiles] = useState([])
    const [photoError, setPhotoError] = useState(false)
    const { handleSubmit, formState: { errors }, control, register,reset} = useForm({ 
    }) 
    const {recomendationList} = useSelector(state => state.user)
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ads',
    });
    const onUploadChange = (fileList) => {
        setPhotoFiles(fileList.fileList)
    }   
    const onSubmitFinish =  async(data) => {  
        if(photoFiles.length === 0){ 
            return setPhotoError(true)
        }
        const {title,subtitle,description,price,pictogram,ads,recomendation} = data  
        setPhotoError(false) 
        setPhotoFiles([])
        const response = await dispatch(createNewDishes({title,subtitle,description,price,pictogram,ads,recomendation, file: photoFiles[0]})) 
        reset()
    }   
    const typeSelect = recomendationList.map((item) => ({
        value: item?.id,
        label: item?.title,
    }))
    return (
        <>
            <div className={s.admin}>
                <div className={s.admin__container}>
                    <form onSubmit={handleSubmit(onSubmitFinish)} className={s.admin__form}>
                        <div className={s.form__item}>
                            <div className={s.form__title}>Название</div>
                            <div className={s.form__input}><input {...register('title', {
                                required: 'Это поле обязательное!'
                            })} type="text" /></div>
                            {errors.title && <span className={s.error__message}>{errors.title.message}</span>}
                        </div>
                        <div className={s.form__item}>
                            <div className={s.form__title}>Краткое описание</div>
                            <div className={s.form__textarea}><textarea {...register('subtitle', {
                                required: 'Это поле обязательное!'
                            })} type="text" /></div>
                            {errors.subtitle && <span className={s.error__message}>{errors.subtitle.message}</span>}
                        </div>
                        <div className={s.form__item}>
                            <div className={s.form__title}>Описание</div>
                            <div className={s.form__textarea}><textarea {...register('description', {
                                required: 'Это поле обязательное!'
                            })} type="text" /></div>
                            {errors.description && <span className={s.error__message}>{errors.description.message}</span>}
                        </div>
                        <div className={s.form__item}>
                            <div className={s.form__title}>Цена</div>
                            <div className={s.form__input}><input {...register('price', {
                                required: 'Это поле обязательное!'
                            })} type="number" /></div>
                            {errors.price && <span className={s.error__message}>{errors.price.message}</span>}
                        </div>
                        <div className={s.form__item}>
                            <div className={s.form__title}>Фото блюд</div>
                            <div className={s.form__filelist}>
                                <Upload.Dragger   
          
                                maxCount={1} 
                                onChange={onUploadChange} 
                                fileList={photoFiles}
                                >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить файлы</p>
                    </Upload.Dragger>  
                    {photoError && <span className={s.error__message}>Загрузите фото для блюда</span>}
                            </div>
                        </div> 

                        <div className={s.form__item}>
                            <div className={s.form__title}>Пиктограммы</div>
                            <div className={s.form__radio}>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'new'} id='new' name="new" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />

                                    Новинка</label>
                                <label className={s.form__radio_label}>

                                    <input type="radio" name="sale" value={'sale'} id='sale' {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Скидка</label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'hot'} id='hot' name="hot" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />

                                    Горячо</label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'cofe'} id='cofe' name="cofe" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Кофе 
                                    </label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'bake'} id='bake' name="bake" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Выпечка
                                </label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'salat'} id='salat' name="salat" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Cалаты
                                </label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'child'} id='child' name="child" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Для детей
                                </label>
                                <label className={s.form__radio_label}>
                                    <input type="radio" value={'steak'} id='steak' name="steak" {...register('pictogram',{ 
                                        required: 'Это поле обязательное!'
                                    })} />
                                    Стейки
                                </label>
                                    {errors.pictogram && <span className={s.error__message}>{errors.pictogram.message}</span>}
                                </div> 

                        </div>



                    <div className={s.form__item}> 
                    <div className={s.form__title}>Добавки</div>
                        {fields?.map((field, index) => (
                            <div  
                            key={field.id}
                            className={s.field}>
                                <div 
                                    className={s.admin__form_item}
                                >
                                    <Controller
                                        name={`ads[${index}]`}
                                        control={control}
                                        defaultValue={field.ads}
                                        rules={{
                                            required: 'Это поле обязательное!'
                                        }}
                                        render={({ field }) => <input className={s.field__input} {...field} />}
                                    />
                                    <Button icon={<DeleteOutlined/>} className={s.form__delete} onClick={() => remove(index)}></Button>
                                </div>
                                {errors?.ads?.[index] && <span className={s.error__message}>{errors?.ads?.[index]?.message}</span>}
                            </div>
                        ))}
                        <button className={s.admin__add_field} onClick={() => append('')}>
                            Добавить поле
                        </button>
                        </div>
                        <div className={s.form__item}> 
                            <div className={s.form__title}>Рекомендации</div> 
                            <Controller name='recomendation' 
                                control={control} 
                                render={({field}) => <Select 
                                {...field}
                                // defaultValue={[colourOptions[2], colourOptions[3]]}
                                isMulti
                                name="colors"
                                options={typeSelect}
                              />}/>
                
                        </div>
                        <div className={s.form__btn}><button type='submit'>Создать</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminPage