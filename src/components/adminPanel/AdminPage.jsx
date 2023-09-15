import React, { useState } from 'react'
import s from './AdminPage.module.css'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { Button, Upload } from 'antd' 
import { InboxOutlined } from '@ant-design/icons';
const AdminPage = () => {
    const [photoFiles, setPhotoFiles] = useState([])
    const { handleSubmit, formState: { errors }, control, register,} = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ads',
    });
    const onUploadChange = (fileList) => {
        console.log(fileList);
        setPhotoFiles(fileList.fileList)
    }
    const onSubmitFinish = (data) => {
        console.log(data);
    }
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

                                {/* <Upload listType='picture'
                                    maxCount={10}
                                    onChange={onUploadChange}
                                    multiple
                                    fileList={photoFiles}>
                                    Upload
                                </Upload> */}
                                <Upload.Dragger   
                                multiple 
                                maxCount={10} 
                                onChange={onUploadChange} 
                                fileList={photoFiles}
                                >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить файлы</p>
                    </Upload.Dragger>
                            </div>
                        </div> 
                        
                        <div className={s.form__item}>
                            <div className={s.form__title}>Пиктограммы</div>
                            <div className={s.form__radio}>
                                <label className={s.form__radio_label}>
                                    <Controller
                                        name="pictogram.new"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                type="radio"
                                                {...field}
                                                id='new'
                                                value={'new'}
                                            />
                                        )}
                                    />
                                    Новинка</label>
                                <label className={s.form__radio_label}>
                                    <Controller
                                        name="pictogram.sale"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                type="radio"
                                                {...field}
                                                id='sale'
                                                value={'sale'}
                                            />
                                        )}
                                    />
                                    Скидка</label>
                                <label className={s.form__radio_label}>
                                    <Controller
                                        name="pictogram.hot"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                type="radio"
                                                {...field}
                                                id='hot'
                                                value={'hot'}
                                            />
                                        )}
                                    />
                                    Горячо</label>
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
                                        defaultValue={field.timetable}
                                        rules={{
                                            required: 'Это поле обязательное!'
                                        }}
                                        render={({ field }) => <input className={s.field__input} {...field} />}
                                    />
                                    <Button className={s.form__delete} onClick={() => remove(index)}>del</Button>
                                </div>
                                {errors?.ads?.[index] && <span className={s.error__message}>{errors?.ads?.[index]?.message}</span>}
                            </div>
                        ))}
                        <button className={s.admin__add_field} onClick={() => append('')}>
                            Добавить поле
                        </button>
                        </div>
                    
                        <div className={s.form__btn}><button type='submit'>Создать</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminPage