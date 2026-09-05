import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, Tabs, Tab, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const destinationsData = [
  { name: 'Киото', desc: 'Отпускное жилье' },
  { name: 'Чарлстон', desc: 'Аренда вилл' },
  { name: 'Даллас', desc: 'Дома в аренду' },
  { name: 'Оаху', desc: 'Отпускное жилье' },
  { name: 'Галф-Шорс', desc: 'Помесячная аренда' },
  { name: 'Роли', desc: 'Дома в аренду' },
  { name: 'Норт-Миртл-Бич', desc: 'Отпускное жилье' },
  { name: 'Портленд', desc: 'Аренда квартир' },
  { name: 'Ницца', desc: 'Дома в аренду' },
  { name: 'Сан-Диего', desc: 'Аренда домов с видом на пляж' },
  { name: 'Токио', desc: 'Отпускное жилье' },
  { name: 'Сан-Антонио', desc: 'Помесячная аренда' },
  { name: 'Горы Поконо', desc: 'Кондоминиумы в аренду' },
  { name: 'Питтсбург', desc: 'Кондоминиумы в аренду' },
  { name: 'Брокен-Боу', desc: 'Отпускное жилье' },
  { name: 'Барселона', desc: 'Отпускное жилье' },
  { name: 'Вашингтон', desc: 'Аренда квартир' },
];

export default function AirbnbFooter() {
  const { control } = useForm({
    defaultValues: {
      categoryTab: 'Популярные',
    },
  });

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: '#f7f7f7',
        borderTop: '1px solid #dddddd',
        pt: 5,
        pb: 8,
        px: { xs: 3, sm: 5, md: 5, lg: 10 }, 
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#222' }}>
          Вдохновение для будущих поездок
        </Typography>

        <Controller
          name="categoryTab"
          control={control}
          render={({ field }) => (
            <Box sx={{ borderBottom: 1, borderColor: '#dddddd', mb: 4 }}>
              <Tabs
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: '#000', height: 2 } }}
              >
                <Tab label="Популярные" value="Популярные" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
                <Tab label="Искусство и культура" value="Искусство и культура" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
                <Tab label="Пляжи" value="Пляжи" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
                <Tab label="Горы" value="Горы" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
                <Tab label="Природа" value="Природа" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
                <Tab label="Чем заняться" value="Чем заняться" sx={{ textTransform: 'none', fontWeight: 600, mr: 3, minWidth: 'auto', px: 0 }} />
              </Tabs>
            </Box>
          )}
        />

            <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(6, 1fr)',
            },
            gap: 3,
            pb: 5, 
            borderBottom: '1px solid #dddddd', 
            mb: 5 
          }}
        >
          {destinationsData.map((item, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: '#222',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#717171', display: 'block' }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="#"
              underline="hover"
              color="inherit"
              sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}
            >
              Показать больше <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Link>
          </Box>
        </Box>

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
            gap: 4
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Поддержка
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'Центр помощи',
                'Помощь: проблема с безопасностью',
                'AirCover',
                'Страховка путешественника',
                'Борьба с дискриминацией',
                'Помощь людям с инвалидностью',
                'Отмена в период пандемии',
                'Сообщить о проблеме в районе',
              ].map((text, idx) => (
                <Link key={idx} href="#" underline="hover" color="text.secondary" variant="body2">
                  {text}
                </Link>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Прием гостей
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'Сдайте жилье на Airbnb',
                'Опубликуйте Впечатление на Airbnb',
                'Предложите услугу на Airbnb',
                'AirCover для хозяев',
                'Материалы для хозяев',
                'Форум сообщества',
                'Ответственный прием гостей',
                'Бесплатный урок для хозяев',
                'Найти второго хозяина',
              ].map((text, idx) => (
                <Link key={idx} href="#" underline="hover" color="text.secondary" variant="body2">
                  {text}
                </Link>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Airbnb
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'Летний выпуск — 2026',
                'Пресс-центр',
                'Карьера в Airbnb',
                'Для инвесторов',
                'Подарочные карты',
                'Прием гостей на Airbnb.org',
              ].map((text, idx) => (
                <Link key={idx} href="#" underline="hover" color="text.secondary" variant="body2">
                  {text}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}