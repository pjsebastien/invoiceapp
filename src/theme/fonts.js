import Metrics from './metrics';

const Size = {
    size2: Metrics.screenWidth * (2 / 365),
    size4: Metrics.screenWidth * (4 / 365),
    size5: Metrics.screenWidth * (5 / 365),
    size6: Metrics.screenWidth * (6 / 365),
    size8: Metrics.screenWidth * (8 / 365),
    size10: Metrics.screenWidth * (10 / 365),
    size12: Metrics.screenWidth * (12 / 365),
    size14: Metrics.screenWidth * (14 / 365),
    size15: Metrics.screenWidth * (15 / 365),
    size16: Metrics.screenWidth * (16 / 365),
    size18: Metrics.screenWidth * (18 / 365),
    size20: Metrics.screenWidth * (20 / 365),
    size24: Metrics.screenWidth * (24 / 365),
    size25: Metrics.screenWidth * (25 / 365),
    size28: Metrics.screenWidth * (28 / 365),
    size30: Metrics.screenWidth * (30 / 365),
    size32: Metrics.screenWidth * (32 / 365),
    size36: Metrics.screenWidth * (36 / 365),
    size40: Metrics.screenWidth * (40 / 365),
    size42: Metrics.screenWidth * (42 / 365),
    size50: Metrics.screenWidth * (50 / 365),
    size100: Metrics.screenWidth * (100 / 365),
    size150: Metrics.screenWidth * (150 / 365),
    size160: Metrics.screenWidth * (160 / 365),
    size190: Metrics.screenWidth * (190 / 365),
    size230: Metrics.screenWidth * (230 / 365),
    size440: Metrics.screenWidth * (440 / 365),
};

const Type = {
    montserratMedium: 'Montserrat-Medium',
    montserratRegular: 'Montserrat-Regular',
    montserratSemiBold: 'Montserrat-SemiBold',
};

const appTheme = { Type, Size };

export default appTheme;
