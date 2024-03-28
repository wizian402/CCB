package com.wizian.cbb.recruit.dao;

import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.plugin.*;

import java.sql.PreparedStatement;
import java.util.Properties;

@Intercepts({
    @Signature(type = ParameterHandler.class, method = "setParameters", args = PreparedStatement.class)
})
public class ParameterLoggingInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        if (invocation.getTarget() instanceof ParameterHandler) {
            ParameterHandler parameterHandler = (ParameterHandler) invocation.getTarget();
            Object parameterObject = parameterHandler.getParameterObject();
            // Null 체크 및 로깅
            if (parameterObject != null) {
                try {
                    System.out.println("Parameter: " + parameterObject.toString());
                } catch (NullPointerException e) {
                    System.out.println("Parameter is null.");
                }
            } else {
                System.out.println("Parameter is null.");
            }
        }
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 필요에 따라 설정
    }
}
