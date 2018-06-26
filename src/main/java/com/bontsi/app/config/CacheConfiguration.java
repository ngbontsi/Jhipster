package com.bontsi.app.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.bontsi.app.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.bontsi.app.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Booking.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Room.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Bill.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.RoomService.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.RoomType.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.CustomerType.class.getName(), jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Booking.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Bill.class.getName() + ".customers", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Bill.class.getName() + ".roomServices", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Bill.class.getName() + ".bookings", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Booking.class.getName() + ".bills", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Room.class.getName() + ".bookings", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.RoomService.class.getName() + ".bills", jcacheConfiguration);
            cm.createCache(com.bontsi.app.domain.Customer.class.getName() + ".bills", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
